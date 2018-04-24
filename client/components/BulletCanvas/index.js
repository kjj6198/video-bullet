// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'ramda';
import CommentAnimation from '../../services/CommentAnimation';
import type { Message } from '../../services/types';

type Props = {
  messages: Array<Message>,
  stop?: boolean,
  fullscreen: boolean,
  currentTime: number,
};

const Canvas = styled.canvas`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100%;
`;

export default class BulletCanvas extends Component<Props> {
  context: CanvasRenderingContext2D;
  canvas: { current: null | HTMLCanvasElement } = React.createRef();
  animation: CommentAnimation;
  width: number;
  frameID: any;
  messages: Array<CommentAnimation>;

  componentDidMount() {
    if (this.canvas.current) {
      const ctx = this.canvas.current.getContext('2d');
      const margin = {
        top: 30,
        bottom: 30,
      };

      this.messages = this.props.messages.map(msg => new CommentAnimation(
        ctx,
        msg,
        {
          x: ctx.canvas.width,
          y: (Math.random() * (ctx.canvas.height - margin.top - margin.bottom) + margin.top),
        },
      ));

      this.start();
    }
  }

  componentDidUpdate(prevProps: Props, prevState) {
    if (prevProps.stop === false && this.props.stop) {
      this.stop();
    } else if (prevProps.stop && this.props.stop === false) {
      this.start();
    }
  }

  stop() {
    cancelAnimationFrame(this.frameID);
  }

  start() {
    // this is main animation logic.
    // only be called when componentDidMount()
    // so there is no way to insert new message.
    // and let message start, stop.
    const ctx = this.canvas.current.getContext('2d');
    const { currentTime } = this.props;
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      this.messages
        .filter(animation => !animation.ended && animation.message.startTime <= currentTime)
        .forEach(animation => animation.update(currentTime));
    }
    this.frameID = requestAnimationFrame(() => this.start());
  }

  render() {
    return (
      <Canvas
        width={1368}
        height={768}
        fullscreen={this.props.fullscreen}
        innerRef={this.canvas}
      />
    );
  }
}
