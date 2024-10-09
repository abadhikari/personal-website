import { useEffect, useRef, useState } from 'react';

interface SimpleAudioPlayerProps {
  src: string;
  initialVolume: number;
  className: string;
  link: string;
  redirectTimeSecs: number;
}

export default function SimpleAudioPlayer({
  src,
  initialVolume,
  className,
  link,
  redirectTimeSecs,
}: SimpleAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMute = () => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.muted = !isMuted;
      currentAudio.play();
    }
    setIsMuted(!isMuted);
  };

  const mute = () => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.muted = true;
    }
    setIsMuted(true);
  };

  const startRedirectTimer = () => {
    // Set a timeout to redirect to link after x seconds
    timeoutRef.current = setTimeout(() => {
      window.open(link, '_blank');
      mute();
    }, redirectTimeSecs * 1000);
  };

  const endRedirectTimer = () => {
    // Clear the timeout before the timeout is complete
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
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
      <audio ref={audioRef} loop>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button
        onClick={toggleMute}
        type="button"
        className={className}
        onMouseEnter={startRedirectTimer}
        onMouseLeave={endRedirectTimer}
      >
        {isMuted ? '🔈' : '🔇'}
      </button>
    </div>
  );
}
