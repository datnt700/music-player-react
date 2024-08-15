import './style.scss';
import cover1 from '../src/assets/cover-1.png';
import cover2 from '../src/assets/cover-2.png';
import playButton from '../src/assets/Play_fill.svg';
import stopButton from '../src/assets/Stop.svg';
import nextButton from '../src/assets/Stop_and_play_fill.svg';
import prevButton from '../src/assets/Stop_and_play_fill-1.svg';
import { useState } from 'react';

const MusicCard = ({
  songs,
  setSongs,
  isplaying,
  setIsPlaying,
  audioElem,
  currentSong,
  setCurrentSong,
  formatSecondsAsTime,
}) => {
  const handlePlayButton = () => {
    setIsPlaying(!isplaying);
  };

  const skipBack = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);
    if (index == 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong({
        ...songs[index - 1],
        progress: 0,
      });
    }
    audioElem.current.currentTime = 0;
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
    }, 100);
  };

  const skipNext = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);
    const duration = audioElem.current.duration;
    if (index == songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong({
        ...songs[index + 1],
        progress: 0,
      });
    }
    audioElem.current.currentTime = 0;
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
    }, 100);
  };

  return (
    <div className="card">
      <img src={currentSong.cover} alt="photo" className="image" />
      <div className="info">
        <h3 className="name">{currentSong.title}</h3>
        <p className="author">{currentSong.author}</p>
      </div>
      <div className="line">
        <div className="line-time">
          <p className="time current">{currentSong.currentTime}</p>
          <p className="time track">{currentSong.length}</p>
        </div>
        <div className="line-bar">
          <div
            className="line-track"
            style={{ flexBasis: `${currentSong.progress + '%'}` }}
          ></div>
        </div>
      </div>

      <div className="control">
        <button className="btn prev" onClick={skipBack}>
          <img src={prevButton} alt="button" />
        </button>

        <button className="btn main">
          <img
            className="start"
            src={isplaying ? playButton : stopButton}
            alt=""
            onClick={handlePlayButton}
          />
        </button>

        <button className="btn next" onClick={skipNext}>
          <img className="right" src={nextButton} alt="" />
        </button>
      </div>
    </div>
  );
};

export default MusicCard;
