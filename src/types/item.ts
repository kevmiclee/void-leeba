import { itemCatalog } from "@/data/items";

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
}

export const defaultItems: Item[] = [
  itemCatalog["dragon-ring"],
  itemCatalog["patched-coat"],
];

export type ItemId =
  | "dragon-ring"
  | "patched-coat"
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
  | "axe";
