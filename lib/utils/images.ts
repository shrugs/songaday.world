import { Topic } from './constants';

export const nameFromKey = (prefix: string, key: string) => `${prefix}_${key.toLowerCase()}.png`;

const NUM_POETIC = 7;
export const resolveTopic = (number: number, topic: Topic): string =>
  topic === Topic.Poetic ? `poetic${(number % NUM_POETIC) + 1}` : topic;
