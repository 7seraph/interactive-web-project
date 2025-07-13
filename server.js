// server.js
// Simple Node.js backend to proxy Spotify API requests and hide client secret

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
let accessToken = '';
let tokenExpires = 0;

app.use(cors());

// Helper to get a new access token if needed
async function getAccessToken() {
    if (accessToken && Date.now() < tokenExpires) {
        return accessToken;
    }
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    accessToken = data.access_token;
    tokenExpires = Date.now() + (data.expires_in - 60) * 1000; // refresh 1 min early
    return accessToken;
}

// Proxy endpoint for recommendations
app.get('/api/recommendations', async (req, res) => {
    const { seedType, seedValue } = req.query;
    if (!seedType || !seedValue) {
        return res.status(400).json({ error: 'Missing seedType or seedValue' });
    }
    const token = await getAccessToken();
    const url = `https://api.spotify.com/v1/recommendations?seed_${seedType}=${seedValue}&limit=10`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
