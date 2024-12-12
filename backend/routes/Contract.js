const express = require("express");
const { create } = require("ipfs-http-client");
const Web3 = require("web3");
const contractABI = require("./contractABI.json"); // ABI of the smart contract
const router = express.Router();

// IPFS client setup (using Infura's public IPFS gateway)
const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

// Ethereum setup
const web3 = new Web3("https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID"); // Replace with your Infura Project ID
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);
const privateKey = "YOUR_WALLET_PRIVATE_KEY"; // Replace with your private key
const account = "YOUR_WALLET_ADDRESS"; // Replace with your wallet address

// POST route to store feedback
router.post("/storeFeedback", async (req, res) => {
    const { candidateId, expertId, skills, experience, communication} = req.body;
  
    try {
      // 1. Add feedback text to IPFS (optional)
      const ipfsResult = await ipfs.add(JSON.stringify({ feedbackText }));
      const ipfsHash = ipfsResult.cid.toString();
  
      // 2. Encode the transaction to call `giveFeedback` with feedback data
      const data = contract.methods
        .giveFeedback(candidateId, expertId, skills, experience, communication)
        .encodeABI();
  
      // 3. Sign and send the transaction
      const tx = {
        from: account,               // Admin account
        to: contractAddress,
        data: data,
        gas: 2000000,
      };
  
      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
      res.status(200).json({
        message: "Feedback stored successfully",
        transactionHash: receipt.transactionHash,
        ipfsHash,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to store feedback" });
    }
  });
  
  
module.exports = router;
