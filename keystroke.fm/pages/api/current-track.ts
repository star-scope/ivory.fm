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
    const data = await spotifyApi.getMyCurrentPlayingTrack();
    
    if (!data.body?.item) {
      res.status(404).json({ error: 'Track data not found' });
      return;
    }

    const track = {
      title: data.body.item?.name,
      artist: data.body.item?.artists?.[0]?.name,
      coverArtUrl: data.body.item?.album?.images?.[0]?.url
    };

    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch current track' });
  }
};

