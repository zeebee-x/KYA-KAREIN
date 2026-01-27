export type ActivityType = 'solo' | 'game';
export type GameMode = 'online' | 'in-person';
export type Mood = 'chill' | 'active' | 'creative' | 'play';

export interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  mood: Mood;
  tips?: string;
  whyFun: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  players: string;
  mode: GameMode;
  mood: Mood;
  rules: string;
  materials?: string;
  prompts?: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  category: string;
  location: string;
  registrationLink?: string;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  distance: string;
  address: string;
}

export interface SavedItem {
  id: string;
  type: 'activity' | 'game' | 'event' | 'place';
  title: string;
  image: string;
  date?: string;
}

export interface UserProfile {
  name: string;
  avatar?: string;
  savedCount: number;
}
