document.addEventListener('DOMContentLoaded', () => {
  const playBtn = document.querySelector('.play-button');
  const forwardBtn = document.querySelector('.forward-button');
  const rewindBtn = document.querySelector('.rewind-button');

  const currentSong = window.songList[0]; // e.g., "binary_sunset.m4a"
  const fullPath = window.library + currentSong; // "/static/audio/binary_sunset.m4a"

  // Detect MIME type
  const getMimeType = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    switch (ext) {
      case 'mp3': return 'audio/mpeg';
      case 'm4a': return 'audio/mp4';
      case 'webm': return 'audio/webm';
      default: return 'audio/mpeg'; // fallback
    }
  };

  // Create Audio element with source
  const audio = document.createElement('audio');
  const source = document.createElement('source');
  source.src = fullPath;
  source.type = getMimeType(currentSong);
  audio.appendChild(source);

  // Optional: attach audio to DOM for visibility (if desired)
  document.querySelector('.progress-bar').appendChild(audio);

  // Hook up play/pause button
  playBtn.addEventListener('click', () => {
    audio.paused ? audio.play() : audio.pause();
  });
});
