// @flow
import React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader'; // eslint-disable-line
import BulletVideo from './Video';
import BulletCanvas from './BulletCanvas';
import type { Message } from '../services/types';

const messages: Array<Message> = [
  {
    startTime: 15,
    endTime: 20,
    content: 'hello world',
    style: {
      color: '#27cc95',
      fontSize: 44,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 0,
    endTime: 20,
    content: 'hello world',
    style: {
      color: 'yellow',
      fontSize: 43,
      fontFamily: 'Playball',
    },
  },
  {
    startTime: 15,
    endTime: 20,
    content: 'hello world',
    style: {
      color: 'yellow',
      fontSize: 42,
      fontFamily: 'Playball',
    },
  },
  {
    startTime: 23,
    endTime: 20,
    content: '[WDS] App updated. Recompiling...',
    style: {
      color: 'yellow',
      fontSize: 40,
      fontFamily: 'Playball',
    },
  },
  {
    startTime: 15,
    endTime: 20,
    content: 'hello world',
    style: {
      color: '#27cc95',
      fontSize: 20,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 14,
    endTime: 20,
    content: '😍😍😍😍😍😍',
    style: {
      color: '#fff',
      fontSize: 30,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 14,
    endTime: 20,
    content: '😍😍😍😍😍😍',
    style: {
      color: '#fff',
      fontSize: 30,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 5,
    endTime: 20,
    content: '就像回到家，找出那些被遺忘的事物',
    style: {
      color: '#fff',
      fontSize: 30,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 22,
    endTime: 20,
    content: '將我早已塵封的記憶再次見日',
    style: {
      color: '#fff',
      fontSize: 30,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 3,
    endTime: 20,
    content: '這世上有著許多回不去的幸福',
    style: {
      color: 'black',
      fontSize: 30,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 18,
    endTime: 20,
    content: '居然投了这首！！',
    style: {
      color: 'blue',
      fontSize: 30,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 0,
    endTime: 20,
    content: '你是大笨蛋',
    style: {
      color: 'red',
      fontSize: 25,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 0,
    endTime: 20,
    content: '你是大笨蛋',
    style: {
      color: 'red',
      fontSize: 25,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 0,
    endTime: 20,
    content: '你是大笨蛋',
    style: {
      color: 'red',
      fontSize: 25,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 0,
    endTime: 20,
    content: '你是大笨蛋',
    style: {
      color: 'red',
      fontSize: 25,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 58,
    endTime: 20,
    content: '但只要與妳在一起',
    style: {
      color: '#000',
      fontSize: 45,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 63,
    endTime: 20,
    content: '居然投了这首！！',
    style: {
      color: '#000',
      fontSize: 45,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 80,
    endTime: 20,
    content: '好聽啊啊啊啊啊啊啊啊qqqqqqqqqqq',
    style: {
      color: '#fff',
      fontSize: 45,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 0,
    endTime: 60,
    content: '8888888',
    style: {
      color: '#fff',
      fontSize: 25,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 0,
    endTime: 40,
    content: '男多女寡的問題已經越來越嚴重了，Washington Post 這篇長文透過幾個主要觀點來分析，適時搭配圖表來呈現數據上的證明，值得大家花點時間閱讀了解（可能需要不少..真的很長..)。',
    style: {
      color: '#748564',
      fontSize: 30,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 0,
    endTime: 20,
    content: '男多女寡的問題已經越來越嚴重了，Washington Post 這篇長文透過幾個主要觀點來分析，適時搭配圖表來呈現數據上的證明，值得大家花點時間閱讀了解（可能需要不少..真的很長..)。',
    style: {
      color: '#fff',
      fontSize: 30,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 0,
    endTime: 20,
    content: 'Jack is awesome',
    style: {
      color: 'rgba(124,20,123,.8)',
      fontSize: 50,
      fontFamily: 'Roboto',
    },
  },
];

class Root extends React.Component {
  state = {
    messages,
    currentTime: 0,
    fullscreen: false,
  };

  handleCurrentTimeChanged = (video) => {
    this.setState({ currentTime: video.currentTime });
  };

  render() {
    return (<div style={{ position: 'relative' }}>
      <BulletCanvas
        messages={this.state.messages}
        currentTime={this.state.currentTime}
        fullscreen={this.state.fullscreen}
        stop={this.state.stop}
      />
      <BulletVideo
        src="./video.mp4"
        onPlay={e => this.setState({ stop: e.target.paused })}
        onPause={e => this.setState({ stop: e.target.paused })}
        onChangeCurrentTime={this.handleCurrentTimeChanged}
        onChangeFullscreen={() => this.setState({ fullscreen: true })}
      />
            </div>);
  }
}


export default hot(module)(connect()(Root));
