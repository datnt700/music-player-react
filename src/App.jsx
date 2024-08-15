import { useRef, useEffect } from 'react';
import { useState } from 'react';
import MusicCard from '../components/musicCard';
import './App.css';
import source1 from './assets/lost-in-city-lights-145038.mp3';
import source2 from './assets/forest-lullaby-110624.mp3';
import cover1 from '../src/assets/cover-1.png';
import cover2 from '../src/assets/cover-2.png';
function App() {
  const songsData = [
    {
      title: 'Lost in the City Lights',
      author: 'Cosmo Sheldrake',
      cover: cover1,
      url: source1,
    },
    {
      title: 'Forest Lullaby',
      author: 'Lesfm',
      cover: cover2,
      url: source2,
    },
  ];

  const [songs, setSongs] = useState(songsData);
  const [isplaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsData[0]);
  const audioElem = useRef(null);

  useEffect(() => {
    if (isplaying) audioElem.current.play();
    else audioElem.current.pause();
  }, [isplaying]);

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const currentTime = audioElem.current.currentTime;

    setCurrentSong({
      ...currentSong,
      progress: (currentTime / duration) * 100,
      length: formatSecondsAsTime(duration),
      currentTime: formatSecondsAsTime(currentTime),
    });
  };

  const formatSecondsAsTime = (seconds) => {
    // Chuyển đổi seconds thành số nguyên
    seconds = parseInt(seconds, 10);

    // Tính toán số phút và giây
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    // Định dạng phút và giây với số chữ số cố định
    const minutesStr = (minutes < 10 ? '0' : '') + minutes;
    const secsStr = (secs < 10 ? '0' : '') + secs;

    return `${minutesStr}:${secsStr}`;
  };

  return (
    <>
      <div className="container">
        <audio ref={audioElem} src={currentSong.url} onTimeUpdate={onPlaying} />
        <MusicCard
          songs={songs}
          setSongs={setSongs}
          isplaying={isplaying}
          setIsPlaying={setIsPlaying}
          audioElem={audioElem}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          formatSecondsAsTime={formatSecondsAsTime}
        />
      </div>
    </>
  );
}

export default App;
