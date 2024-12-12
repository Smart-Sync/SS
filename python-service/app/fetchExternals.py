import requests
from bs4 import BeautifulSoup
from fuzzywuzzy import fuzz
from urllib.parse import urljoin
import pandas as pd
import re
from typing import List, Dict, Any


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


def clean_professor_data(professor_info: Dict[str, Any]) -> Dict[str, str]:
    """
    Clean the professor data by separating name, designation, qualifications, and skills.
    """
    cleaned_professor = {}

    # Name is already extracted, no need to change
    cleaned_professor['name'] = professor_info.get('name')

    # Separate qualification details (designations and qualifications)
    qualifications = professor_info.get('qualifications', [])

    designation_found = set()  # Use a set to automatically handle duplicates
    skills_found = set()  # Use a set to automatically handle duplicates
    
    if qualifications:
        for qualification in qualifications:
            # Add spaces between concatenated words (e.g., MausamProfessor -> Mausam Professor)
            qualification = re.sub(r'([a-z])([A-Z])', r'\1 \2', qualification)
            
            # Search for designations (e.g., Professor, Assistant Professor)
            designation_pattern = r'\b(Professor|Assistant Professor|Lecturer|Associate Professor|Fellow|Chair)\b'
            designation_matches = re.findall(designation_pattern, qualification)
            designation_found.update(designation_matches)  # Add found designations to the set
            
            # Extract skills based on common keywords
            skill_keywords = ["Algorithms", "Optimization", "Machine Learning", "Data Systems", "Networks", "Artificial Intelligence"]
            skills_in_qualification = [skill for skill in skill_keywords if skill.lower() in qualification.lower()]
            skills_found.update(skills_in_qualification)  # Add found skills to the set
            
    # Convert sets back to comma-separated strings
    cleaned_professor['designation'] = ', '.join(designation_found) if designation_found else "Not Specified"
    cleaned_professor['skills'] = ', '.join(skills_found) if skills_found else "Not Specified"
    
    return cleaned_professor


def scrape_professors(soup: BeautifulSoup) -> List[Dict[str, str]]:
    """
    Scrapes the professors' data (name, designation, and skills) from the page.
    """
    # professors = []

    # # Look for all major sections that might contain professor data
    # sections = soup.find_all(['div', 'li', 'p', 'table', 'tr', 'td', 'ul'])

    # for section in sections:
    #     professor_info = {
    #         'name': '',
    #         'designation': '',
    #         'qualifications': []
    #     }

    #     # Extract the professor's name from specific tags (adjust based on your structure)
    #     name_tag = section.find(['h2', 'h3', 'p'], string=re.compile(r'\bprofessor\b', re.IGNORECASE))
    #     if name_tag:
    #         professor_info['name'] = name_tag.get_text(strip=True)

    #     # Extract designation (Professor, Assistant Professor, etc.)
    #     designation_tag = section.find('p', string=re.compile(r'\b(Professor|Assistant Professor|Lecturer|Associate Professor|Fellow|Chair)\b', re.IGNORECASE))
    #     if designation_tag:
    #         professor_info['designation'] = designation_tag.get_text(strip=True)

    #     # Extract qualifications (e.g., Ph.D., Master's degree, etc.)
    #     qualifications_tag = section.find_all('p', string=re.compile(r'\b(Ph.D.|Master|Bachelor|M.Sc.|M.A.|M.Tech)\b', re.IGNORECASE))
    #     for tag in qualifications_tag:
    #         qualifications = tag.get_text(strip=True)
    #         if qualifications:
    #             professor_info['qualifications'].append(qualifications)

    #     # Only add if there's meaningful information (e.g., a name or designation)
    #     if any(professor_info.values()):
    #         professors.append(professor_info)

    # return professors
    professors = []

    # Look for all major sections that might contain professor data
    sections = soup.find_all(['div', 'li', 'p', 'table', 'tr', 'td', 'ul'])

    for section in sections:
        professor_info = {
            'name': '',
            'designation': '',
            'qualifications': []
        }

        # Extract the professor's name from specific tags (adjust based on your structure)
        name_tag = section.find(['h2', 'h3', 'p'], string=re.compile(r'\bprofessor\b', re.IGNORECASE))
        if name_tag:
            professor_info['name'] = name_tag.get_text(strip=True)

        # Extract designation (Professor, Assistant Professor, etc.)
        designation_tag = section.find('p', string=re.compile(r'\b(Professor|Assistant Professor|Lecturer|Associate Professor|Fellow|Chair)\b', re.IGNORECASE))
        if designation_tag:
            professor_info['designation'] = designation_tag.get_text(strip=True)

        # Extract qualifications (e.g., Ph.D., Master's degree, etc.)
        qualifications_tag = section.find_all('p', string=re.compile(r'\b(Ph.D.|Master|Bachelor|M.Sc.|M.A.|M.Tech)\b', re.IGNORECASE))
        for tag in qualifications_tag:
            qualifications = tag.get_text(strip=True)
            if qualifications:
                professor_info['qualifications'].append(qualifications)

        # Only add if there's meaningful information (e.g., a name or designation)
        if any(professor_info.values()):
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

    cleaned_professors = []
    for professor in professors:
        cleaned_professors.append(clean_professor_data(professor))

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
    df_professors.insert(0, 'ID', range(1, len(df_professors) + 1))

    return df_professors
