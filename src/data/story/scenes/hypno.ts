import { Scene, ScenePayload } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";

export const hypnoScenes = {
  hypno: (payload?: ScenePayload): Scene => ({
    id: "hypno",
    text:
      `You had fallen asleep on some dream moss, but you open your eyes to find yourself in a dressing room ` +
      `with a script in your hands, practicing lines for a play:` +
      `^^"What a good boy am I, so far from being an ant."^"What a good boy... am I! So... <i>far</i> from being an ant!"` +
      `^"What a good boy am I, so far... from <i>being</i> an ant."^...` +
      `^"Builder of the gods, put an orange-soda fountain in my bedroom!"` +
      `^"Builder... <i>of the gods</i>, put an orange-soda fountain in... <i>my bedroom</i>!"` +
      `^"BUILDER OF THE GODS... PUT AN ORANGE-SODA FOUNTAIN IN MY BEDROOM!"^...` +
      `^"Where's my wife? I miss her."^"Where's my... <i>wife?</i> I miss her!"` +
      `^"Where's <i>my</i> wife? <i>I miiiiiss herrrrrrr</i>!!!"`,
    background: bgDefault,
    choices: () => [{ text: "Keep practicing." }, { text: "Finish." }],
    //TODO:
  }),
};
