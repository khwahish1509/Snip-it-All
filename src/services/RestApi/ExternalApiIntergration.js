// Question:
// Create a GET /weather endpoint that fetches weather data for a given city using the OpenWeatherMap API.

const axios = require('axios');
const WEATHER_API_KEY = 'your-openweathermap-api-key';

// GET /weather
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).send('City is required');
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching weather data');
    }
});
