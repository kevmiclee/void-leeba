import { Item, ItemId } from "@/types/item";

export const itemCatalog: Record<ItemId, Item> = {
  // "dragon-ring": {
  //   id: "dragon-ring",
  //   label: "Dragon ring",
  //   description:
  //     `The dragon is made of stainless steel with ruby red eyes. In its claws, it holds ` +
  //     `a swirling planet of turquoise.`,
  //   actionText:
  //     "This ring always makes you feel connected to the Gurpy you never met.",
  //   value: 0,
  //   weight: 0,
  //   permanent: true,
  //   usable: false,
  // },

  // "patched-coat": {
  //   id: "patched-coat",
  //   label: "Patched coat",
  //   description:
  //     `There is an intricately-hooked patch on its back that shows four images: ` +
  //     `an ancient windmill, an historic longship, a modern wind turbine, and a lobster boat.`,
  //   actionText: "Smells like Mormor.",
  //   value: 0,
  //   weight: 0,
  //   permanent: true,
  //   usable: false,
  // },

  pinecone: {
    id: "pinecone",
    label: "Pinecone",
    description: "A pinecone.",
    actionText: "It's prickly to the touch.",
    value: 0,
    weight: 1,
    usable: true,
  },

  "pine-needles": {
    id: "pine-needles",
    label: "Pine needles",
    description:
      "Long, brown and pointy on one end. Some are paired together, others in bunches of three.",
    actionText: "Pine needly.",
    value: 0,
    weight: 1,
    usable: true,
  },

  mushroom: {
    id: "mushroom",
    label: "Mushroom",
    description: "Spongy, earthy, fungal.",
    actionText: "Tastes like dirt. You feel funny.",
    value: 0,
    weight: 1,
    type: "consumable",
    usable: true,
  },

  "hongatar-trash": {
    id: "hongatar-trash",
    label: "Hongatar trash",
    description: "Empty snail shells. Looks like they were licked clean.",
    actionText:
      "You roll the shells around in your palm. They emit a delicate clacking sound.",
    value: 0,
    weight: 1,
    usable: true,
  },

  "self-help-book": {
    id: "self-help-book",
    label: "Self help book",
    description:
      `The book is titled "Sisu". The author's name sounds Finnish. ` +
      `There is an illustration of two hikers at the top of a snowy peak.`,
    value: 0,
    weight: 2,
    usable: true,
  },

  "dog-food": {
    id: "dog-food",
    label: "Dog food can",
    description: `Maybe you'll meet a hungry dog.`,
    value: 0,
    weight: 1,
    usable: true,
  },

  cards: {
    id: "cards",
    label: "Playing cards",
    description: `Maybe someone will want to play.`,
    value: 0,
    weight: 1,
    usable: true,
  },

  "spray-paint": {
    id: "spray-paint",
    label: "Orange spray paint",
    description: `Maybe you'll spray paint something.`,
    value: 0,
    weight: 1,
    type: "consumable",
    usable: true,
  },

  translator: {
    id: "translator",
    label: "Translator",
    description: `Maybe you'll encounter a language you can't comprehend.`,
    value: 0,
    weight: 1,
    usable: false,
  },

  "beest-recording": {
    id: "beest-recording",
    label: "Beest recording",
    description: ``,
    //TODO: description
    value: 0,
    weight: 1,
    usable: true,
  },

  "brain-moss": {
    id: "brain-moss",
    label: "Brain moss",
    description: `Fine, leathery strings of pink stuff.`,
    actionText:
      "You twirl the moss around above your head like a ribbon dancer.",
    value: 0,
    weight: 1,
    usable: true,
  },

  axe: {
    id: "axe",
    label: "Ax",
    description: `A single-headed carbon-fiber ax.`,
    value: 0,
    weight: 5,
    usable: true,
  },
};
//TODO: More items

export const defaultItems: Item[] = [
  // itemCatalog["dragon-ring"],
  // itemCatalog["patched-coat"],
];
