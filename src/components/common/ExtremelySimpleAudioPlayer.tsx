import { useEffect, useRef, useState } from 'react';

interface SimpleAudioPlayerProps {
  src: string;
  initialVolume: number;
  className: string;
}

/**
 * `SimpleAudioPlayer` is a minimal React component for playing looping audio with mute toggle.
 *
 * It accepts an audio `src`, an initial volume level, and a custom class name for the toggle button.
 * Audio starts muted by default and can be toggled on/off by clicking the button.
 *
 * @param {string} src - Path to the audio file (must be a valid `.mp3` or supported type).
 * @param {number} initialVolume - A number between 0.0 and 1.0 for initial playback volume.
 * @param {string} className - CSS class applied to the mute/unmute button.
 *
 * @returns A button-controlled looping audio player.
 */
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
      if (currentAudio.muted) {
        currentAudio.pause();
      } else {
        currentAudio.play();
      }
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
      <audio ref={audioRef} loop>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button onClick={toggleMute} type="button" className={className}>
        {isMuted ? '🔈' : '🔇'}
      </button>
    </div>
  );
}
