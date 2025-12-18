export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        // Get IP address from request headers (Vercel format)
        const forwarded = req.headers['x-forwarded-for'];
        const ip = forwarded
            ? forwarded.split(',')[0].trim()
            : req.headers['x-real-ip'] ||
              req.socket?.remoteAddress ||
              'unknown';

        console.log('IP detected:', ip);
        return res.status(200).json({ ip });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
