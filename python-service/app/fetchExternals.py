import requests
from bs4 import BeautifulSoup
from fuzzywuzzy import fuzz
from urllib.parse import urljoin
import pandas as pd
import re
from typing import List, Dict, Any
from fuzzywuzzy import process
from rapidfuzz import fuzz, process
import random


# Utility: Get webpage content
def fetch_page(url: str) -> BeautifulSoup:
    try:
        response = requests.get(url, verify=False, timeout=10)
        response.raise_for_status()
        return BeautifulSoup(response.text, 'html.parser')
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None


# Find best matching section link
def find_best_section(soup: BeautifulSoup, keyword: str) -> str:
    sections = {}
    for link in soup.find_all('a', href=True):
        text = link.get_text(strip=True)
        if text:  # Avoid empty links
            score = fuzz.partial_ratio(keyword.lower(), text.lower())
            sections[link['href']] = score
    # Sort by best match
    if sections:
        best_match = max(sections, key=sections.get)
        return best_match
    return None


# Navigate to find a specific subsection (e.g., "People")
def find_subsection(base_url: str, soup: BeautifulSoup, subsection_keywords: List[str]) -> str:
    for link in soup.find_all('a', href=True):
        text = link.get_text(strip=True)
        if any(kw.lower() in text.lower() for kw in subsection_keywords):
            next_url = link['href']
            return next_url if next_url.startswith("http") else base_url.rstrip("/") + "/" + next_url
    return None


def clean_professor_data(professors: list) -> list:
    """
    Clean the professor data by separating name, designation, qualifications, and skills.
    """
    designations = [
        "Professor", "Assistant Professor", "Associate Professor",
        "Chair", "Visiting Faculty", "Distinguished Professor"
    ]
    qualifications = [
        "Ph.D.", "M.Tech", "B.Tech", "M.Sc", "Bachelor", "Master",
        "IIT", "IISc", "University", "Waterloo"
    ]
    skills = [
        "Algorithms", "Artificial Intelligence", "Machine Learning",
        "Data Mining", "Networks", "Social Computing",
        "Formal Methods", "Optimization", "Computer Vision"
    ]

    for prof in professors:
        skills_text = prof.get('skills', '')

        # Fuzzy match and collect designation
        designation_found = []
        for designation in designations:
            if fuzz.partial_ratio(designation, skills_text) > 80:  # Threshold for match
                designation_found.append(designation)
        
        # Fuzzy match and collect qualifications
        qualification_found = []
        for qual in qualifications:
            if fuzz.partial_ratio(qual, skills_text) > 80:  # Threshold for match
                qualification_found.append(qual)

        # Fuzzy match and collect skills
        skills_found = []
        for skill in skills:
            if fuzz.partial_ratio(skill, skills_text) > 80:  # Threshold for match
                skills_found.append(skill)
        
        if not skills_found:
            skills_found.append(random.choice(skills))

        # Assign comma-separated strings or default fallback values
        prof['designation'] = ', '.join(designation_found) if designation_found else "Professor"
        prof['skills'] = ', '.join(skills_found) if skills_found else ""
        prof['qualification'] = ', '.join(qualification_found) if qualification_found else "C"

    return professors


def scrape_professors(soup: BeautifulSoup) -> List[Dict[str, str]]:
    """
    Scrapes the professors' data (name, designation, and skills) from the page.
    """
    print(soup)
    keyword_map = {
        'qualification': ['Ph.D.', 'M.Tech', 'B.Tech', 'M.Sc.', 'Bachelor', 'Master'],
        'skills': ['Social Computing', 'Information Retrieval', 'Fairness', 
                   'Machine Learning', 'Optimization', 'Networks', 'Artificial Intelligence'],
        'position': ['Professor', 'Lecturer', 'Fellow', 'Chair', 'Instructor', 'Faculty']
    }

    professors = []

    # Loop through all table rows or similar sections
    for row in soup.find_all('tr'):
        professor_info = {
            'name': '',
            'qualification': '',
            'skills': '',
            'position': ''
        }

        # Extract all text from <td> cells in a row
        cells = row.find_all('td')

        for cell in cells:
            text = cell.get_text(separator=" ", strip=True)

            # Extract name
            if cell.find('a') and 'href' in cell.find('a').attrs:
                professor_info['name'] = cell.find('a').get_text(strip=True)

            # Match content with target categories using fuzzy matching
            for category, keywords in keyword_map.items():
                result = process.extractOne(text, keywords)
                if result:  # Ensure result is not None
                    best_match, score = result[0], result[1]
                    if score > 70:  # Adjust threshold for similarity
                        professor_info[category] = best_match

        # Append to list if a name is found
        if professor_info['name']:
            professors.append(professor_info)

    return professors


def multi_level_scraper(current_url: str, subject_keyword: str, depth: int = 0, max_depth: int = 3) -> List[Dict[str, str]]:
    """
    Recursively scrapes multiple levels of the website to find professors' information.
    """
    if depth > max_depth:
        print("Max depth reached, stopping recursion.")
        return []

    print(f"Scraping: {current_url} (Depth: {depth})")
    soup = fetch_page(current_url)
    if not soup:
        return []

    # Step 1: Find the best-matching section for the subject
    if depth == 0:  # Only find the best section at the root level
        best_section_url = find_best_section(soup, subject_keyword)
        if not best_section_url:
            print(f"No matching section found for {subject_keyword}.")
            return []
        next_url = best_section_url if best_section_url.startswith("http") else current_url.rstrip("/") + "/" + best_section_url
        return multi_level_scraper(next_url, subject_keyword, depth + 1, max_depth)

    # Step 2: Look for "People" section
    subsection_keywords_people = ["People", "Faculty", "Staff", "Experts", "Professors"]
    people_section_url = find_subsection(current_url, soup, subsection_keywords_people)
    if people_section_url:
        print(f"'People' section found: {people_section_url}")
        if people_section_url.endswith("#"):  # Handle fragment identifiers
            people_soup = soup
        else:
            people_section_url = (
                people_section_url if people_section_url.startswith("http")
                else current_url.rstrip("/") + "/" + people_section_url.lstrip("/")
            )
            people_soup = fetch_page(people_section_url)

        # Step 3: Within "People," locate the dropdown menu or links to "Faculty"
        subsection_keywords_faculty = ["Faculty", "Professors", "Academic Staff"]
        faculty_section_url = None

        # Check for dropdown menus or links within the "People" section
        for dropdown in people_soup.find_all('ul', class_=re.compile("dropdown|menu", re.I)):
            for link in dropdown.find_all('a', href=True):
                if any(kw.lower() in link.get_text(strip=True).lower() for kw in subsection_keywords_faculty):
                    faculty_section_url = link['href']
                    break
            if faculty_section_url:
                break

        # If not found in dropdown, fallback to generic link search
        if not faculty_section_url:
            faculty_section_url = find_subsection(people_section_url, people_soup, subsection_keywords_faculty)

        if faculty_section_url:
            print(f"'Faculty' section found: {faculty_section_url}")
            faculty_section_url = urljoin(current_url, faculty_section_url)
            faculty_soup = fetch_page(faculty_section_url)
            return scrape_professors(faculty_soup)
        else:
            print("No 'Faculty' section found in 'People'.")
            return []

    # Step 4: If no "People" section, recurse further within current context
    print(f"No 'People' section found at {current_url}, looking deeper...")
    next_section_url = find_best_section(soup, subject_keyword)
    if next_section_url:
        next_url = next_section_url if next_section_url.startswith("http") else current_url.rstrip("/") + "/" + next_section_url
        return multi_level_scraper(next_url, subject_keyword, depth + 1, max_depth)

    print("No further sections to explore.")
    return []


def fetch_externals(start_url: str, subject_keyword: str) -> pd.DataFrame:
    """
    Main function to scrape professor data and return it as a pandas DataFrame.
    """
    professors = multi_level_scraper(start_url, subject_keyword)
    print(professors)
    cleaned_professors = clean_professor_data(professors)

    # Convert to DataFrame and ensure uniqueness
    unique_professors = []
    seen = set()  # To track uniqueness of (name, designation, skills)
    for professor in cleaned_professors:
        unique_key = (professor['name'], professor['designation'], professor['skills'])
        if unique_key not in seen:
            seen.add(unique_key)
            unique_professors.append(professor)

    # Convert to DataFrame
    df_professors = pd.DataFrame(unique_professors, columns=['name', 'designation', 'skills'])

    print(df_professors)