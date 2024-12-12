import pandas as pd
import math
from pandas._libs.tslibs.nattype import NaTType
from sentence_transformers import SentenceTransformer
from app.database import get_experts, get_candidates
from .model import calculate_relevancy_score, compute_matching_score, get_embeddings, sentence_model
from bson import ObjectId
from app.services import optimize_allocation
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from fastapi.responses import JSONResponse
from .fetchExternals import fetch_externals

app = FastAPI()

def objectid_to_str(data):
    """Recursively convert ObjectId to string."""
    if isinstance(data, dict):
        return {key: objectid_to_str(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [objectid_to_str(item) for item in data]
    elif isinstance(data, ObjectId):
        return str(data)
    elif isinstance(data, NaTType):
        return None  # Replace NaT with None
    elif isinstance(data, float):
        if math.isnan(data) or math.isinf(data):  # Check for NaN or Infinity
            return 0.0  # Replace with 0.0 (or use None if desired)
        return data
    else:
        return data
    
# Request body for the candidates and experts
class MatchingRequest(BaseModel):
    requirement: str
    candidates: Optional[List[dict]] = None

@app.get("/")
def read_root():
    return {"message": "FastAPI Service for Model Inference"}

# # Endpoint to compute the similarity between expert and candidate skills
@app.post("/compute_profile_score/")
def compute_profile_score(request: MatchingRequest):
    print(request)
    if request.candidates:
        candidates = request.candidates
        print("********",candidates)
    else:
        print("not in")
        candidates = get_candidates()
    candidate_df = pd.DataFrame(candidates)
    board_embedding = sentence_model.encode([request.requirement]).tolist()
    candidate_embeddings = sentence_model.encode(candidate_df['skills'].tolist()).tolist()
    candidate_board_matching_scores = compute_matching_score(candidate_embeddings, board_embedding).flatten()
    candidate_matching_dict = {
        candidate_df.iloc[i]['ID']: candidate_board_matching_scores[i]
        for i in range(len(candidate_df))
    }
    ranked_candidates = sorted(
        candidate_df.to_dict('records'),
        key=lambda x: candidate_board_matching_scores[candidate_df.index[candidate_df['ID'] == x['ID']].tolist()[0]],
        reverse=True
    )

    # Select top X candidates
    top_x = 5
    top_candidates = ranked_candidates[:top_x]
    print(top_candidates)
    # expert_df=fetch_externals("https://www.iitd.ac.in/",request.requirement)
    experts = get_experts()
    expert_df = pd.DataFrame(experts)
    print(expert_df)
    experts_embeddings = get_embeddings(expert_df['skills'].tolist()).tolist()

    # Calculate semantic similarity
    expert_board_matching_scores = compute_matching_score(experts_embeddings, board_embedding).flatten()
    expert_matching_dict = {
        expert_df.iloc[i]['ID']: expert_board_matching_scores[i]
        for i in range(len(expert_df))
    }
    ranked_experts = sorted(
        expert_df.to_dict('records'),
        key=lambda x: expert_board_matching_scores[expert_df.index[expert_df['ID'] == x['ID']].tolist()[0]],
        reverse=True
    )

    # Select top X experts
    top_x = 3
    top_experts = ranked_experts[:top_x]
    print(top_experts)
    relevancy_score = calculate_relevancy_score(top_experts,top_candidates,candidate_matching_dict,expert_matching_dict)
    results = optimize_allocation(relevancy_score,top_experts,top_candidates)
    results = objectid_to_str(results)
    return JSONResponse(content={"results": results})
# Load your models once here
@app.on_event("startup")
def load_models():
    print("Loading models at startup...")
