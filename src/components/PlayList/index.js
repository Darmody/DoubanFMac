import React from 'react';
import { withState } from 'recompose';
import ReactList from 'react-list';
import { Motion, spring } from 'react-motion';
import styles from './styles.scss';

const renderSongName = (playList, onJump) => (index, key) => {
  const song = playList[index];

  return (
    <div className="songItem" key={key} onClick={onJump(song)} >
      {`${index + 1}. ${song.name} - ${song.artist}`}
    </div>
  );
};

const renderContent = (expand, collapse, playList, onJump) => ({ top }) => {
  const contentStyle = {
    top: `${top}rem`
  };

  return (
    <div className={styles.playList} style={contentStyle}>
      <div className="listPanel">
        <ReactList
          itemRenderer={renderSongName(playList, onJump)}
          length={playList.length}
          updateWhenThisValueChanges={playList}
        />
      </div>
      <div className="indicator" onClick={collapse} >
        <i className="material-icons" >
          { expand ? 'eject' : 'play_for_work' }
        </i>
      </div>
    </div>
  );
};

const renderStyles = (expand) => {
  const defaultStyle = {
    top: spring(-20, { damping: 14, stiffness: 120 }),
  };
  const motionStyle = {
    top: spring(0, { damping: 14 })
  };

  return expand ? motionStyle : defaultStyle;
};

const playListComponent = ({
  playList, onJump,
  expand, collapse
}) => {
  const handleCollapse = () => collapse(!expand);
  return (
    <Motion style={renderStyles(expand)}>
      {renderContent(expand, handleCollapse, playList, onJump)}
    </Motion>
  );
};

export default withState('expand', 'collapse', false)(playListComponent);
