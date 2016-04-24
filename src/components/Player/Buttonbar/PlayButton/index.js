import React from 'react';
import { branch, renderComponent } from 'recompose';

const Play = ({ onClick }) => (
  <button onClick={onClick} title="暂停" >
    <i className="material-icons" > pause </i>
  </button>
);

const Pause = ({ onClick }) => (
  <button onClick={onClick} title="播放" >
    <i className="material-icons" > play_arrow </i>
  </button>
);

const PlayButton = branch(
  props => props.playing,
  renderComponent(Play),
  renderComponent(Pause),
)({});

export default PlayButton;
