import pandas as pd
from app.database import get_experts, get_candidates
from app.services import process_matching
from fastapi import FastAPI
from pydantic import BaseModel
from .model import get_embeddings, compute_similarity, profile_score
import torch

app = FastAPI()

# Request body for the candidates and experts
class MatchingRequest(BaseModel):
    requirement: str

@app.get("/")
def read_root():
    return {"message": "FastAPI Service for Model Inference"}

# Endpoint to compute the similarity between expert and candidate skills
@app.post("/compute_profile_score/")
def compute_profile_score(request: MatchingRequest):
    candidates = get_candidates()
    candidate = pd.DataFrame(candidates)
    experts = get_experts()
    expert = pd.DataFrame(experts)

    results = process_matching(expert, candidate, request.requirement)

    return {"results": results}

# Load your models once here
@app.on_event("startup")
def load_models():
    print("Loading models at startup...")