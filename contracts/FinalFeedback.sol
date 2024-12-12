// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FeedbackStorage {
    struct Feedback {
        string expertId;    // Address of the expert giving feedback
        string ipfsHash;    // IPFS hash storing feedback details
        string comment;     // Additional comments from the expert
        uint256 timestamp;  // Timestamp of feedback submission
    }

    mapping(uint256 => Feedback) public feedbacks; // Mapping candidate ID to feedback
    uint256 public feedbackCount = 0;              // Total count of feedback entries

    // Event to log feedback submission
    event FeedbackGiven(
        uint256 candidateId,
        string expertId,
        string ipfsHash,
        string comment,
        uint256 timestamp
    );

    function giveFeedback(
        uint256 candidateId,
        string memory expertId,
        string memory ipfsHash,
        string memory comment
    ) public {
        // Store feedback
        feedbacks[candidateId] = Feedback({
            expertId: expertId,
            ipfsHash: ipfsHash,
            comment: comment,
            timestamp: block.timestamp
        });
        feedbackCount++;

        // Emit feedback event
        emit FeedbackGiven(candidateId, expertId, ipfsHash, comment, block.timestamp);
    }

    function getFeedback(uint256 candidateId)
        public
        view
        returns (
            string memory expertId,
            string memory ipfsHash,
            string memory comment,
            uint256 timestamp
        )
    {
        Feedback memory fb = feedbacks[candidateId];
        return (fb.expertId, fb.ipfsHash, fb.comment, fb.timestamp);
    }
}
