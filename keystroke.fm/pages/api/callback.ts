import { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, error } = req.query;

  if (error) {
    console.error('Callback Error:', error);
    res.status(500).send(`Callback Error: ${error}`);
    return;
  }

  try {
    const data = await spotifyApi.authorizationCodeGrant(code as string);
    const { access_token, refresh_token } = data.body;

    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    res.redirect('/home');
  } catch (err) {
    if (err instanceof Error) {  // TypeScript type checking
      console.error('Error getting Tokens:', err);
      res.status(500).send(`Error getting Tokens: ${err.message}`);
    } else {
      console.error('An unexpected error occurred:', err);
      res.status(500).send('An unexpected error occurred.');
    }
  }
};
