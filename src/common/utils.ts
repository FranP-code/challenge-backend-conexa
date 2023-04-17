export const pickRandomValue = (arr: any[]): any =>
  arr[Math.floor(Math.random() * arr.length)];

export const isProd = () => process.env.NODE_ENV === 'production';
