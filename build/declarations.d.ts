declare module 'cli-spinners' {
  export interface Spinners {
    [name: string]: {
      interval: number;
      frames: string[];
    };
  }
}
