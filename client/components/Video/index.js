import React, { Component } from 'react';
import styled from 'styled-components';
import { requestFullScreen, exitFullScreen, isFullScreen } from './utils';

type Props = {
  src: string,
  fullscreen: boolean,
  ended?: boolean,
  autoplay?: boolean,
  muted?: boolean,
  bufferedTime?: number,
  volume?: number,
  paused: boolean,
  controls?: boolean,
};

type State = {
  duration: number,
}

const VideoWrapper = styled.div`
  width: 75%;
  max-width: 1200px;
  margin: 1em auto;
`;

export default class BulletVideo extends Component<Props, State> {
  video : null | React.ElementRef<HTMLVideoElement>;
  state: State = {
    currentTime: 0,
  };

  static defaultProps = {
    fullscreen: false,
    ended: false,
    autoplay: false,
    muted: false,
    volume: 1,
    paused: true,
    controls: false,
  };

  constructor(props) {
    super(props);
    this.video = React.createRef();
  }

  componentDidMount() {
    [
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'fullscreenchange',
    ].forEach((event) => {
      document.addEventListener(event, this.onChangeFullScreen);
    });
  }

  componentWillUnmount() {
    document.removeEventListener('fullscreenchange', this.onChangeFullScreen);
  }

  onChangeFullScreen = (e) => {
    console.log(e);
  }

  gotoFullScreen = (e) => {
    requestFullScreen(this.video.current);
  }

  changeCurrentTime = () => {
    this.setState({ currentTime: this.video.current.currentTime });
  }


  render() {
    const {
      src,
      autoplay,

    } = this.props;
    const { currentTime } = this.state;
    return (
      <div>
        <button onClick={this.gotoFullScreen}>FULL</button>
        <span>{Math.floor(currentTime / 60)} : {Math.floor(currentTime % 60)}</span>
        <VideoWrapper>
          <video
            onPlay={console.log}
            onPause={console.log}
            onTimeUpdate={this.changeCurrentTime}
            onSeeking={this.changeCurrentTime}
            onSeeked={this.changeCurrentTime}
            ref={this.video}
            controls
            autoPlay={autoplay}
            allowFullScreen
            webkitallowfullscreen="true"
          >
            <source src={src} type="video/mp4" />
          </video>
        </VideoWrapper>
      </div>
    );
  }
}
