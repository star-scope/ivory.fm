import { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  accessToken: process.env.SPOTIFY_ACCESS_TOKEN
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await spotifyApi.skipToPrevious();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to skip to previous track', success: false });
    }
};
