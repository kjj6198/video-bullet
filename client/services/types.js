// @flow

export type Message = {
  startTime: number,
  endTime: number,
  style: {
    color?: string | CanvasGradient | CanvasPattern,
    fontSize?: number,
    fontFamily?: string,
  },
  content: string,
};

