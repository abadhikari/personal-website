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
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const longPressRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleMouseEnter = () => {
    // Set a timeout to hover over button to redirect to link after x seconds
    hoverTimeoutRef.current = setTimeout(() => {
      window.open(link, '_blank');
      mute();
    }, redirectTimeSecs * 1000);
  };

  const handleMouseLeave = () => {
    // Clear the timeout if the mouse leaves before the timeout is complete
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleTouchStart = () => {
    // Set a timeout for holding buttom to redirect to link after x seconds
    longPressRef.current = setTimeout(() => {
      window.open(link, '_blank');
      mute();
    }, redirectTimeSecs * 1000);
  };

  const handleTouchEnd = () => {
    // Clear the timeout if the hold on button ends before the timeout is complete
    if (longPressRef.current) {
      clearTimeout(longPressRef.current);
      longPressRef.current = null;
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {isMuted ? '🔈' : '🔇'}
      </button>
    </div>
  );
}
