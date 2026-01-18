import { DictionaryEntry, DictionaryEntryId } from "@/types/dictionary";

export const dictionaryEntries: Record<DictionaryEntryId, DictionaryEntry> = {
  hongatar: {
    id: "hongatar",
    name: "Hongatar",
    description:
      `Hongatar are mischief incarnate. They, like nature, are neither good nor evil, not lawful nor chaotic. ` +
      `Sometimes they help a small child escape a cave, even though they might complain about the nuisance cuttingly, ` +
      `and make fun of the kid. Sometimes they will help a megalomaniac into great power by hacking their competitor's ` +
      `{hyperleak}s. The reason faeries glow is because they have a pure and beautiful life force like {dorgang}.`,
  },

  hyperleak: {
    id: "hyperleak",
    name: "Hyperleak",
    description:
      `A Hyperleak is a prosumer product. Invented by ServTek, this machine is under constant corporate surveillance ` +
      `throughout all Leaks. If you do anything on this machine, ServTek will know for sure. Client-side scanning, baby.` +
      `<br><br>That being said, this machine is SO user-friendly or 'easy-to-use'. Though, it is easy to use mostly because ` +
      `everyone in the Leakyverse uses ServTek interfaces and are used to their particular type of user-hostile. Organisms resist change.`,
  },

  leaks: {
    id: "leaks",
    name: "Leaks",
    description: `Leaks are the portals between tangetial realities. These portals can take the 
    form of computers, phones, reflections and mirrors. They can be connecting any realities, 
    but there's always a reason. For example, a pun, a double-meaning, a strong emotional stress or an obsession.`,
  },

  dorgang: {
    id: "dorgang",
    name: "Dorgang",
    description:
      `If Dorgang were not so ethical, he might be a real sex wizard. But don't get your hopes up, this guy is GREY in many ways. ` +
      `He does like puns and dry humor, however. Always cleverness is Dorgang's jam. And he also knows a lot about anything weird, ` +
      `powerful or mystical. He's always on his enemies' asses, making sure they do not commit evil against large swatches of ` +
      `other people. Dorgang is not exactly what one might call 'chill' or 'bussin'. That being said, you REALLY want Dorgang on ` +
      `your team, no matter what.<br><br>Dorgang is a Gandalf-like parody character made up by someone at Wendall Carefare's ` +
      `Leaktable. If a comparative reference to Dorgang led you here, just know that Dorgang can be used as a comparative ` +
      `character-reference to the chracter that is being compared to Dorgang. They are Dorgang-like.`,
  },

  whatever: {
    id: "whatever",
    name: "Whatever",
    description:
      "Whatever can be somewhere, somehow, something. But it has not figured out where that is yet.",
  },

  player: {
    id: "player",
    name: "Player",
    description: `#PLAYER# is you. The {Supreme Hegemon of Tangential Reality} chose you, a splashing hapless clownfish, 
    because they see something special in you.`,
  },

  "Supreme Hegemon of Tangential Reality": {
    id: "Supreme Hegemon of Tangential Reality",
    name: "Supreme Hegemon of Tangential Reality",
    description: `The Supreme Hegemon of Tangential Reality (SHTR) was born from the {Goofball Dust Explosion}. 
    As the most prominent entity born in this epochal event, it carries with it responsibility and power unknown 
    to other entities. The SHTR holds dominion over and is omniscient of all Tangetial Realities. It behooves the 
    {player} to entertain the SHTR and make them laugh so they bestow a kind eye on their existence.`,
  },

  "Goofball Dust Explosion": {
    id: "Goofball Dust Explosion",
    name: "Goofball Dust Explosion",
    description:
      "The Goofball Dust Explosion (GDE) is the primordial event that spawned all {Leaks}.",
  },

  keg: {
    id: "keg",
    name: "Keg",
    description:
      `A keg is a consumer product that dispenses liquid by forcing it under pressure out through a dispenser nozzle.` +
      `Kegs were invented in the EARF Leak to dispense a psychoactive poison liquid called {beer} that lowers inhibitions and numbs pain.` +
      `Kegs allow for high-volume dispensation of beer.`,
  },

  beer: {
    id: "beer",
    name: "Beer",
    description:
      `Beer is a psychoactive poison liquid that lowers inhibitions and numbs pain. Beer has its origins in the EARF Leak` +
      "And has now dispersed throughout the {Leakyverse}.",
  },

  Leakyverse: {
    id: "Leakyverse",
    name: "Leakyverse",
    description: `The Leakyverse refers to the sum total of {Leaks} and their interconnections.`,
  },

  //TODO: CHORE - Mudman description
  Mudman: {
    id: "Mudman",
    name: "Mudman",
    description: "",
  },
};
