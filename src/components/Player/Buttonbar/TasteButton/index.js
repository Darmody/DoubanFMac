import React from 'react';
import { branch, renderComponent } from 'recompose';

const Favorite = ({ onClick }) => (
  <button onClick={onClick} title="取消喜欢" >
    <i className="material-icons favorite" > favorite </i>
  </button>
);

const Unfavorite = ({ onClick }) => (
  <button onClick={onClick} title="喜欢" >
    <i className="material-icons" > favorite </i>
  </button>
);

const TasteButton = branch(
  props => props.favorite,
  renderComponent(Favorite),
  renderComponent(Unfavorite),
)({});

export default TasteButton;
