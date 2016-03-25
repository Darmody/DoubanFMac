import ipc from 'ipc';

function listen(channelId, tasteSong, controlSong, banSong, nextSong) {
  const handler = (event) => {
    switch (event) {
      case 'controlSong':
        return controlSong();
      case 'likeSong':
        return tasteSong('like');
      case 'dislikeSong':
        return tasteSong('dislike');
      case 'banSong':
        return banSong();
      case 'nextSong':
        return nextSong();
      default:
        return '';
    }
  };

  ipc.on('shortcut-pressed', handler);

  return handler;
}

function stop(listener) {
  ipc.removeListener('shortcut-pressed', listener);
}

export default {
  listen,
  stop
};
