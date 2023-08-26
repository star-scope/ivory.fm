import { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  accessToken: process.env.SPOTIFY_ACCESS_TOKEN // assuming you've saved the token somewhere
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await spotifyApi.getMyCurrentPlaybackState();
    if (data.body.is_playing) {
      await spotifyApi.pause();
    } else {
      await spotifyApi.play();
    }
    res.status(200).json({ playing: !data.body.is_playing });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle play/pause' });
  }
};