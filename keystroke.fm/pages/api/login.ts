import { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';
import crypto from 'crypto';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

export default (req: NextApiRequest, res: NextApiResponse) => {
  const scopes = ['user-read-private', 'user-read-playback-state', 'user-modify-playback-state'];
  
  const state = generateRandomString(16);
  
  res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
};

function generateRandomString(length: number): string {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}