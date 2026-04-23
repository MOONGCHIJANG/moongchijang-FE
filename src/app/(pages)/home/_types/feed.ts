export interface Feed {
  id: number;
  dDay: string;
  pickupDate: string;
  storeName: string;
  location: string;
  currentParticipants: number;
  maxParticipants: number;
  title: string;
  price: number;
  progress: number;
  imageUrl?: string;
}

export type FilterId = 'all' | 'due' | 'target';
