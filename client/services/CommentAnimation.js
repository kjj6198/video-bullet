// @flow
import type { Message } from './types';

interface Drawable {
  draw(): void;
  update(): void;
}

type Position = {
  x: number,
  y: number
};

export default class CommentAnimation implements Drawable {
  ctx: CanvasRenderingContext2D;
  message: Message;
  position: Position;
  origin: Position;
  time: number = 10;
  frameID: ?number;
  speed: number;
  ended: boolean;

  constructor(
    ctx: CanvasRenderingContext2D,
    message: Message,
    position: Position,
  ) {
    this.ctx = ctx;
    this.message = message;
    this.position = position;
    this.origin = position;
    this.ended = false;
  }

  getSpeed(): number {
    const { ctx, message } = this;
    if (this.speed || this.speed === 0) {
      return this.speed;
    }
    const speed = (ctx.canvas.width + (2 * ctx.measureText(message.content).width)) / 1000;
    this.speed = speed;
    return speed;
  }

  draw(currentTime?: number) {
    const { ctx, message } = this;

    ctx.globalCompositeOperation = 'destination-over';

    ctx.fillStyle = `${message.style.color || 'black'}`;
    ctx.font = `bold ${message.style.fontSize}px ${message.style.fontFamily}`;
    ctx.fillText(
      message.content,
      this.position.x,
      this.position.y,
    );

    this.position.x -= ((currentTime - message.startTime) / 10) * this.getSpeed();

    ctx.restore();
  }

  update(currentTime?: number) {
    if (this.position.x > -this.ctx.measureText(this.message.content).width - 200) {
      this.draw(currentTime);
    } else {
      this.ended = true;
    }
  }
}
