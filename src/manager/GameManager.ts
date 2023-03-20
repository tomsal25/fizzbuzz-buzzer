import { enemyProp, setting } from "../parameter";
import { Choice } from "../types/FizzBuzz";
import { Enemy, Player, System } from "./Characters";
import { Footer, Header, Main, Wrapper } from "./components";
import { drawer, drawerButton } from "./components/Drawer";
import { State } from "./state/State";

// components
const header = Header.getInstance();
const main = Main.getInstance();
const wrapper = Wrapper.getInstance(main.node);
const footer = Footer.getInstance();

const { timeLimit, gameLevel, enemyAmount } = setting;

// TODO: multi player
const player = new Player(1, "me");
// TODO: amount of enemy
const enemyList = [];
for (let i = 0; i < enemyAmount; i++) {
  enemyList.push(new Enemy(i + 1, enemyProp));
}
const character = [player, ...enemyList];

const system = new System();
const state = State.getInstance();

let gameTimer = 0;
let enemyTimerList: number[] = [];

const makeTimer = (limit: number, playerName: string) => {
  gameTimer = window.setTimeout(() => {
    gameOver(playerName);
  }, limit);
};

export const init = () => {
  footer.init();
  state.init(character);
};

const update = () => {
  window.clearTimeout(gameTimer);
  state.update();
  footer.update();
  makeTimer(timeLimit, state.currentPlayerName);
};

const pushMessage = (node: HTMLElement) => {
  main.node.appendChild(node);
  wrapper.autoScrollToBottom();
};

const gameOver = (playerName: string) => {
  enemyTimerList.forEach(e => window.clearTimeout(e));
  footer.stopInput();
  state.stopGame();

  pushMessage(system.failedMessage(playerName));
  pushMessage(system.retryMessage());
  window.clearTimeout(gameTimer);

  // add retry button
  footer.node.appendChild(footer.retryButton.node);
};

const loop = (choice: Choice, playerName: string) => {
  pushMessage(player.makeMessage(`${choice.number}`));
  // check if player's answer
  if (!state.isValidChoice(choice)) {
    gameOver(playerName);
    return;
  }
  update();

  let delaySum = 0;
  enemyTimerList = [];

  for (const cha of character) {
    // set enemy only
    if (cha instanceof Player) continue;

    delaySum += cha.delay;

    // if enemy answers correctly, set timer in order
    enemyTimerList.push(
      window.setTimeout(() => {
        const choice = cha.getRandomNumber();
        pushMessage(cha.makeMessage(choice.number));
        if (!state.isValidChoice(choice)) {
          gameOver(cha.playerName);
          return;
        }
        update();
      }, delaySum)
    );
  }

  enemyTimerList.push(
    window.setTimeout(() => {
      if (!state.isGameOver()) footer.resumeInput();
    }, delaySum)
  );
};

export const setup = () => {
  for (const btn of footer.inputButtonList) {
    btn.node.addEventListener("click", () => {
      const { playerID, playerName } = player;
      const number = btn.getNumber();

      if (gameLevel === "normal") {
        footer.stopInput();
      }
      loop({ playerID, number }, playerName);
    });
  }
};

// attach setup function to retry button
footer.retryButton.node.addEventListener("click", init);

// pack components
export const fragment = new DocumentFragment();
fragment.append(
  drawerButton.node,
  drawer.node,
  header.node,
  wrapper.node,
  footer.node
);
