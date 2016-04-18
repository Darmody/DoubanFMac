import React, { Component, PropTypes } from 'react';
import ReactList from 'react-list';
import { Motion, spring } from 'react-motion';
import styles from './styles.scss';

export default class PlayList extends Component {
  static propTypes = {
    playList: PropTypes.array.isRequired,
    onJump: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { expand: false };
  }

  handleCollapse = () => {
    this.setState({ expand: !this.state.expand });
  }

  renderSongName = (index, key) => {
    const renderSong = this.props.playList[index];

    return (
      <div className="songItem" key={key} onClick={this.props.onJump(renderSong)} >
        {`${index + 1}. ${renderSong.name} - ${renderSong.artist}`}
      </div>
    );
  }

  renderContent = (expand, playList) => ({ top }) => {
    const contentStyle = {
      top: `${top}rem`
    };

    return (
      <div className={styles.playList} style={contentStyle}>
        <div className="listPanel">
          <ReactList
            itemRenderer={this.renderSongName}
            length={playList.length}
            updateWhenThisValueChanges={playList}
          />
        </div>
        <div className="indicator" onClick={this.handleCollapse} >
          <i className="material-icons" >
            { expand ? 'eject' : 'play_for_work' }
          </i>
        </div>
      </div>
    );
  }

  renderStyles = (expand) => {
    const defaultStyle = {
      top: spring(-20, { damping: 14, stiffness: 120 }),
    };
    const motionStyle = {
      top: spring(0, { damping: 14 })
    };

    return expand ? motionStyle : defaultStyle;
  }

  render() {
    const { playList } = this.props;
    const { expand } = this.state;
    return (
      <Motion style={this.renderStyles(expand)}>
        {this.renderContent(expand, playList)}
      </Motion>
    );
  }
}
