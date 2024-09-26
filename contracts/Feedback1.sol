// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FeedbackStorage {
    struct Feedback {
        address expert;
        uint256 skills;
        uint256 experience;
        uint256 communication;
        uint256 timestamp;
    }

    mapping(uint256 => Feedback) public feedbacks; // Mapping candidate ID to feedback
    uint256 public feedbackCount = 0;

    event FeedbackGiven(
        uint256 candidateId,
        address expert,
        uint256 skills,
        uint256 experience,
        uint256 communication,
        uint256 timestamp
    );

    function giveFeedback(
        uint256 candidateId,
        uint256 skills,
        uint256 experience,
        uint256 communication
    ) public {
        feedbacks[candidateId] = Feedback({
            expert: msg.sender,
            skills: skills,
            experience: experience,
            communication: communication,
            timestamp: block.timestamp
        });
        feedbackCount++;
        emit FeedbackGiven(candidateId, msg.sender, skills, experience, communication, block.timestamp);
    }

    function getFeedback(uint256 candidateId) public view returns (
        address,
        uint256,
        uint256,
        uint256,
        uint256
    ) {
        Feedback memory fb = feedbacks[candidateId];
        return (fb.expert, fb.skills, fb.experience, fb.communication, fb.timestamp);
    }
}
