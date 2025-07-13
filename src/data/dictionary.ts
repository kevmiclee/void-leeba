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
      `A Hyperleak is a prosumer product. Invented by Survecap, this machine is under constant corporate surveillance ` +
      `throughout all Leaks. If you do anything on this machine, Survecap will know for sure. Client-side scanning, baby.` +
      `<br><br>That being said, this machine is SO user-friendly or 'easy-to-use'. Though, it is easy to use mostly because ` +
      `everyone in the Leakyverse uses Survecap interfaces and are used to their particular type of user-hostile. Organisms resist change.`,
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
};
