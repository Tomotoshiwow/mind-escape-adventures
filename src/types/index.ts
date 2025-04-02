
export type MBTIType = 
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP' 
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP' 
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ' 
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export type NegativeThoughtType = 
  | 'anxiety' 
  | 'worry' 
  | 'rumination' 
  | 'self-criticism' 
  | 'perfectionism' 
  | 'fear' 
  | 'sadness' 
  | 'regret' 
  | 'guilt' 
  | 'overwhelm'
  | 'other';

export interface UserPreference {
  id: string;
  name: string;
  category: string;
}

export interface UserProfile {
  mbti: MBTIType | null;
  likes: UserPreference[];
  dislikes: UserPreference[];
  negativeThoughts: string;
  negativeThoughtType: NegativeThoughtType[];
  location?: string;
}

export interface ActivityCategory {
  id: string;
  name: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  personalizedMessage: string;
  imageUrl: string;
  category: string;
  duration: string;
  price: string;
  schedule: string;
  location: string;
  mapLink?: string;
  bookingLink: string;
  discount?: string;
  isFavorite?: boolean;
}

export interface StoryProps {
  userId: string;
  activityType: string;
}

export interface MindfulnessPrompt {
  id: string;
  type: 'eastern' | 'western';
  content: string;
}
