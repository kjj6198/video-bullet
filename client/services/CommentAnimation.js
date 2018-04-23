// @flow
import type { Message } from './types';

interface Drawable {
  draw(): void;

}

type Position = {
  x: number,
  y: number
};

export default class CommentAnimation implements Drawable {
  ctx: CanvasRenderingContext2D;
  message: Message;
  position: Position;
  speed: number;
  frameID: ?number;
  ended: boolean;

  constructor(
    ctx: CanvasRenderingContext2D,
    message: Message,
    position: Position,
  ) {
    this.ctx = ctx;
    this.message = message;
    this.position = position;
    this.speed = 5;
    this.ended = false;
  }

  draw() {
    const { ctx, message } = this;

    ctx.globalCompositeOperation = 'destination-over';

    ctx.fillStyle = `${message.style.color || 'black'}`;
    ctx.font = `${message.style.fontSize}px ${message.style.fontFamily}`;
    ctx.fillText(
      message.content,
      this.position.x,
      this.position.y,
    );

    this.position.x -= this.speed;

    ctx.restore();
  }

  update() {
    if (this.position.x > -this.ctx.measureText(this.message.content).width - 200) {
      this.draw();
    } else {
      this.ended = true;
    }
  }
}
