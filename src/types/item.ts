export interface Item {
  id: ItemId;
  label: string;
  description: string;
  actionText?: string;
  value?: number;
  weight: number;
  type?: string;
  action?: () => void;
  permanent?: boolean;
  pageAcquired?: string;
  usable: boolean;
}

export type ItemId =
  | "pinecone"
  | "pine-needles"
  | "mushroom"
  | "hongatar-trash"
  | "self-help-book"
  | "dog-food"
  | "cards"
  | "spray-paint"
  | "translator"
  | "beest-recording"
  | "brain-moss"
  | "axe"
  | "time-fly"
  | "leakcoin";
