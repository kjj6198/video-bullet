// @flow
import React, { Component } from 'react';
import styled from 'styled-components';


type Message = {
  startTime: number,
  endTime: number,
  text: string,
  style?: string,
  font?: string,
}

type Props = {
  messages: Array<Message>,
};

const messages: Array<Message> = [
  {
    startTime: 0,
    endTime: 20,
    text: 'hello world',
    style: '45px "PingFang TC"',
    font: '45px "PingFang TC"',
  },
  {
    startTime: 30,
    endTime: 50.56,
    text: 'MY COMMENT',
    style: '25px "PingFang TC"',
    font: '25px "PingFang TC"',
  },
];

const Canvas = styled.canvas`
  background-color: transparent;
  width: 854px;
  height: 480px;
`;

export default class BulletCanvas extends Component<Props> {
  canvas: React.Ref;
  context: CanvasRenderingContext2D;
  width: number;

  constructor(props: Props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    if (this.canvas) {
      this.context = this.canvas.current.getContext('2d');
    }
    const message : Message = messages[0];

    this.width = this.context.measureText(message.text).width;
    this.start();
  }

  componentDidUpdate() {

  }

  start() {
    const { context: ctx } = this;
    const message : Message = messages[0];
    ctx.clearRect(0, 0, 1368, 1000);
    ctx.save();
    ctx.font = message.font;
    ctx.strokeStyle = 'black';
    ctx.shadowBlur = 3;
    ctx.lineWidth = 1;
    ctx.fillStyle = 'red';
    ctx.fillText(message.text, ctx.canvas.width + this.width, 100);
    ctx.restore();
    this.width -= 3;

    requestAnimationFrame(() => this.start());
  }

  render() {
    return (
      <Canvas
        width="1368"
        height="768"
        innerRef={this.canvas}
      />
    );
  }
}
