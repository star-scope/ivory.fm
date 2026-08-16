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
    
    const item = data.body?.item;

    // The current item may also be a podcast episode, which has no artist/album.
    if (!item || item.type !== 'track') {
      res.status(404).json({ error: 'Track data not found' });
      return;
    }

    const track = {
      title: item.name,
      artist: item.artists?.[0]?.name,
      coverArtUrl: item.album?.images?.[0]?.url
    };

    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch current track' });
  }
};

