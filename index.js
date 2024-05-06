const express = require('express');
const {Web3} = require('web3'); // Import Web3 library

// Check if Web3 provider is available (e.g., Infura for testnet)
const web3Provider = 'https://sepolia.infura.io/v3/4750b2c77702472c9026609eb884a25b'; // Update with your Infura project ID

// Create a new Web3 instance with the provider
const web3 = new Web3(new Web3.providers.HttpProvider(web3Provider));

const app = express();
// Assume you have deployed TestToken contract with its ABI and address
const testTokenABI = require('./TestTokenABI.json'); // Load ABI from file
const testTokenAddress = '0x21d19971c2E3BB25718577A855800991CFEC7206';
const testTokenContract = new web3.eth.Contract(testTokenABI, testTokenAddress);

// API endpoint to get Test token balance
app.get('/getbalance', async (req, res) => {
    const { address } = req.query;

    try {
        // Validate address
        if (!web3.utils.isAddress(address)) {
            throw new Error('Invalid Ethereum address');
        }

        // Get Test token balance using the contract's methods
        const balance = await testTokenContract.methods.balanceOf(address).call();

        res.json({ balance: balance.toString() });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
