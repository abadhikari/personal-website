import { useEffect, useRef, useState } from 'react';

interface SimpleAudioPlayerProps {
  src: string;
  initialVolume: number;
  className: string;
}

export default function SimpleAudioPlayer({
  src,
  initialVolume,
  className,
}: SimpleAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.muted = !isMuted;
      currentAudio.play();
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

      <button onClick={toggleMute} type="button" className={className}>
        {isMuted ? '🔇' : '🔈'}
      </button>
    </div>
  );
}
