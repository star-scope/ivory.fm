import React, { useState, useEffect } from 'react';

const Player: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    title: '',
    artist: '',
    coverArtUrl: ''
  });

  const fetchCurrentTrack = async () => {
    const response = await fetch('/api/current-track');
    const track = await response.json();
    setCurrentTrack(track);
  };

  useEffect(() => {
    fetchCurrentTrack();
  }, []);

  const togglePlay = async () => {
    const response = await fetch('/api/toggle-play', { method: 'POST' });
    const { playing } = await response.json();
    setIsPlaying(playing);
  };

  const toggleSkipForward = async () => {
    try {
        const response = await fetch('/api/skip-forward', { method: 'POST' });
        const { success } = await response.json();

        if (success) {
            // Update the track info to the next track
            fetchCurrentTrack();
        }
    } catch (error) {
        console.error("Error skipping forward:", error);
    }
};

const toggleSkipBackwards = async () => {
    try {
        const response = await fetch('/api/spotify/skip-backwards', { method: 'POST' });
        const { success } = await response.json();

        if (success) {
            fetchCurrentTrack();
        }
    } catch (error) {
        console.error("Error skipping backwards:", error);
    }
};

  return (
    <div className="player">
      <img src={currentTrack.coverArtUrl} width={100} height={100} />
      <p>{currentTrack.title}</p>
      <p>{currentTrack.artist}</p>
      <img src="../icons/back.svg" onClick={() => toggleSkipBackwards()}></img>
      <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      <img src="../icons/forward.svg" onClick={() => toggleSkipForward()}></img>
    </div>
  );
};

export default Player;
