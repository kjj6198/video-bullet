// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import CommentAnimation from '../../services/CommentAnimation';
import type { Message } from '../../services/types';

type Props = {
  messages: Array<Message>,
};

const messages: Array<Message> = [
  {
    startTime: 0,
    endTime: 20,
    content: 'hello world',
    style: {
      color: '#27cc95',
      fontSize: 20,
      fontFamily: 'PingFang TC',
    },
  },
  {
    startTime: 0,
    endTime: 20,
    content: '你是大笨蛋asd',
    style: {
      color: 'red',
      fontSize: 25,
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

const Canvas = styled.canvas`
  background-color: transparent;
  width: 854px;
  height: 480px;
`;

export default class BulletCanvas extends Component<Props> {
  canvas: React.Ref;
  context: CanvasRenderingContext2D;
  animation: CommentAnimation;
  width: number;
  frameID: any;
  messages: Array<CommentAnimation>;

  constructor(props: Props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    if (this.canvas.current) {
      this.context = this.canvas.current.getContext('2d');
    }

    const ctx = this.context;
    this.messages = messages.map(msg => new CommentAnimation(
      ctx,
      msg,
      { x: ctx.canvas.width, y: Math.random() * ctx.canvas.height + 30 },
    ));

    this.frameID = requestAnimationFrame(this.start.bind(this));
  }

  start() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.messages.forEach(animation => animation.update());
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
