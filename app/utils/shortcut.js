import ipc from 'ipc';

function listen(channelId, song, like, dislike, controlSong, banSong, nextSong) {
  const handler = (event) => {
    switch (event) {
      case 'controlSong':
        return controlSong();
      case 'likeSong':
        return like(channelId, song.id);
      case 'dislikeSong':
        return dislike(channelId, song.id);
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
