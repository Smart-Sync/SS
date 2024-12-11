# /python-service/app/model.py
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import joblib


# Load the pre-trained Sentence-BERT model once
sentence_model = SentenceTransformer('bert-base-nli-mean-tokens')

relevancy_model = joblib.load('G:/Tanvi/Web-Dev/smart-sync/python-service/app/relevancy_model.pkl')

# Function to get sentence embeddings
def get_embeddings(text_list):
    embeddings = sentence_model.encode(text_list)
    return embeddings

# Function to compute cosine similarity between two sets of embeddings
def compute_matching_score(expert_embeddings, subject_embedding):
    expert_embeddings = np.array(expert_embeddings)
    subject_embedding = np.array(subject_embedding)

    if expert_embeddings.ndim == 1:
        expert_embeddings = expert_embeddings.reshape(1, -1)  # Reshape to (1, n_features)
    if subject_embedding.ndim == 1:
        subject_embedding = subject_embedding.reshape(1, -1)  # Reshape to (1, n_features)

    return cosine_similarity(expert_embeddings, subject_embedding)


def prepare_features(expert_id, candidate_id, expert_skill, candidate_skill, candidate_matching_dict,expert_matching_dict):
    # Generate embeddings for expert and candidate skills
    expert_skill_embedding = get_embeddings(expert_skill)
    candidate_skill_embedding = get_embeddings(candidate_skill)

    # Extract other features
    candidate_board_matching_score = candidate_matching_dict[candidate_id]
    expert_board_matching_score = expert_matching_dict[expert_id]
    expert_candidate_profile_score = compute_matching_score(expert_skill_embedding,candidate_skill_embedding)[0][0]
    # Return features as a list
    return [
        candidate_board_matching_score,
        expert_board_matching_score,
        expert_candidate_profile_score,
    ]

def calculate_relevancy_score(experts_data, candidates_data, candidate_matching_dict,expert_matching_dict):
    expert_candidate_relevancy_scores = {}

    for expert in experts_data:
        expert_skills = expert["skills"].split(", ")  # Convert skills to a list of strings
        expert_id = expert["ID"]

        if expert_id not in expert_candidate_relevancy_scores:
            expert_candidate_relevancy_scores[expert_id] = []

        for candidate in candidates_data:
            candidate_skills = candidate["skills"].split(", ")  # Convert candidate skills to list
            candidate_id = candidate["ID"]


            # Prepare the features for the prediction
            features = prepare_features(expert_id, candidate_id, expert_skills, candidate_skills, candidate_matching_dict,expert_matching_dict)

            # Convert features to a 2D array (1 row with multiple features)
            features_2d = [features]  # This makes it a 2D array

            # Predict the relevancy score using the trained model
            relevancy_score = relevancy_model.predict(features_2d)[0]

            # Store the result
            expert_candidate_relevancy_scores[expert_id].append({
                "candidate_id": candidate_id,
                "relevancy_score": relevancy_score
            })

    return expert_candidate_relevancy_scores

