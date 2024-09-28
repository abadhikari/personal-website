import { useEffect, useRef, useState } from 'react';
import * as styles from './styles/ExtremelySimpleAudioPlayer.module.css';

interface SimpleAudioPlayerProps {
  src: string;
  initialVolume: number;
}

export default function SimpleAudioPlayer({
  src,
  initialVolume,
}: SimpleAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.volume = initialVolume;
    }
  }, []);

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} autoPlay loop>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button onClick={toggleMute} type="button" className={styles.audioButton}>
        {isMuted ? '🔇' : '🔈'}
      </button>
    </div>
  );
}
