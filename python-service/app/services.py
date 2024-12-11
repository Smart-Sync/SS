from ortools.linear_solver import pywraplp

def optimize_allocation(expert_candidate_relevancy_scores, experts_data, candidates_data):
    # Get the total number of candidates and experts
    total_candidates = len(candidates_data)
    total_experts = len(experts_data)

    # Calculate fair capacity
    fair_capacity = total_candidates // total_experts
    remainder = total_candidates % total_experts

    solver = pywraplp.Solver.CreateSolver('SCIP')
    if not solver:
        raise Exception("Solver not initialized!")

    # Get all expert ids and candidate ids
    expert_ids = [expert["ID"] for expert in experts_data]
    candidate_ids = [candidate["ID"] for candidate in candidates_data]

    # Create decision variables (0 or 1 if candidate is assigned to expert)
    x = {}
    for c in candidate_ids:
        for e in expert_ids:
            x[(c, e)] = solver.BoolVar(f'x_{c}_{e}')

    # Constraints: Each candidate must be assigned to exactly one expert
    for c in candidate_ids:
        solver.Add(solver.Sum(x[(c, e)] for e in expert_ids) == 1)

    # Constraints: Each expert cannot exceed their fair capacity
    for i, expert in enumerate(experts_data):
        expert_id = expert["ID"]
        # Add extra capacity to the first 'remainder' experts
        expert_capacity = fair_capacity + 1 if i < remainder else fair_capacity
        solver.Add(solver.Sum(x[(c, expert_id)] for c in candidate_ids) <= expert_capacity)

    # Objective: Maximize the total profile score (sum of all x[c, e] * profile_score)
    objective = solver.Objective()
    for expert_id, candidate_scores in expert_candidate_relevancy_scores.items():
        for score in candidate_scores:
            c = score["candidate_id"]
            relevancy_score = score["relevancy_score"]
            objective.SetCoefficient(x[(c, expert_id)], relevancy_score)

    objective.SetMaximization()

    # Solve the problem
    status = solver.Solve()

    if status == pywraplp.Solver.OPTIMAL:
        allocation = {}
        # Iterate over the candidates and experts and construct the required structure
        for c in candidate_ids:
            for e in expert_ids:
                if x[(c, e)].solution_value() > 0:
                    # Find the expert and candidate objects by their IDs
                    candidate = next(candidate for candidate in candidates_data if candidate["ID"] == c)
                    expert = next(expert for expert in experts_data if expert["ID"] == e)
                    expert_name = expert["name"]
                    expert_email = expert["email"]
                    if expert_name not in allocation:
                        allocation[expert_name] = {
                            "email": expert_email,
                            "candidates": [],
                            "acceptanceStatus": "pending",  # Default value
                            "scored": False,
                        }
                    allocation[expert_name]["candidates"].append({
                        "Candidate": candidate["name"],
                        "Id": candidate["candidateId"],
                        "Relevancy Score": expert_candidate_relevancy_scores[e][candidate_ids.index(c)]["relevancy_score"]
                    })
        return allocation
    else:
        # Debugging status code and error message
        print(f"Solver Status: {status}")
        return None
