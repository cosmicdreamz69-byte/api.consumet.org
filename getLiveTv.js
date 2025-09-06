export default async function handler(req, res) {
    // The new, correct API endpoint for all live matches from streamed.pk
    const LIVE_TV_API_URL = 'https://streamed.pk/api/matches/all';

    try {
        const response = await fetch(LIVE_TV_API_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch from streamed.pk: ${response.statusText}`);
        }
        const data = await response.json();

        // Set headers to allow access from your website and cache the result for 1 minute
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

        // Send the data back to your Wolfflix website
        res.status(200).json(data);

    } catch (error) {
        // If something goes wrong, send back an error message
        res.status(500).json({ error: error.message });
    }
}