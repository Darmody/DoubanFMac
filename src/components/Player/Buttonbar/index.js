import React from 'react';
import TasteButton from './TasteButton';
import PlayButton from './PlayButton';
import styles from './styles.scss';

const BanButton = ({ onClick }) => (
  <button onClick={onClick} title="不再播放" >
    <i className="material-icons" > cancel </i>
  </button>
);

const NextButton = ({ onClick }) => (
  <button onClick={onClick} title="下一首" >
    <i className="material-icons" > skip_next </i>
  </button>
);

const buttonbarComponent = ({ song, playing, onTaste, onBan, onControl, onNext }) => (
  <div className={styles.buttonBar}>
    <div className="tasteButtonGroup">
      <TasteButton favorite={song.favorite} onClick={onTaste} />
      <BanButton onClick={onBan} />
    </div>
    <div className="controlButtonGroup">
      <PlayButton playing={playing} onClick={onControl} />
      <NextButton onClick={onNext} />
    </div>
  </div>
);

export default buttonbarComponent;
