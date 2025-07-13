// Replace with your Spotify API credentials
const CLIENT_ID = '8d4eedabeb334f378fdb6a1b60026fd7';
let accessToken = '';

// Function to get Spotify API access token
async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${CLIENT_ID}`)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    accessToken = data.access_token;
}

// Function to fetch recommendations from your backend
async function getRecommendations(seedType, seedValue) {
    const url = `/api/recommendations?seedType=${encodeURIComponent(seedType)}&seedValue=${encodeURIComponent(seedValue)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.tracks;
}

// Function to display recommendations
function displayRecommendations(tracks) {
    const recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = '';

    tracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.className = 'track';
        trackElement.innerHTML = `
            <img src="${track.album.images[0].url}" alt="${track.name}" />
            <p><strong>${track.name}</strong> by ${track.artists.map(artist => artist.name).join(', ')}</p>
        `;
        recommendationsContainer.appendChild(trackElement);
    });
}

// Event listener for the form submission
document.getElementById('recommendationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const seedType = document.getElementById('seedType').value;
    const seedValue = document.getElementById('seedValue').value;

    if (!accessToken) {
        await getAccessToken();
    }

    const tracks = await getRecommendations(seedType, seedValue);
    displayRecommendations(tracks);
});