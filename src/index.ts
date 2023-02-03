import "./style.scss";

import SimpleBar from "simplebar";
import "simplebar/dist/simplebar.css";

// state list
const state = {
  current_number: 0,
  current_player: "init",
  game_state: "init",
  timer: 0,
};

const parameter = {
  // response delay[s]
  response_speed: 1,
  // probability of correct answer 0-1.0
  response_accuracy: 0.9,
};

// HTMLElement list
const component = {
  app: document.getElementById("app") as HTMLDivElement,
  header: document.getElementById("header") as HTMLDivElement,
  wrapper: document.getElementById("wrapper") as HTMLDivElement,
  main: document.getElementById("main") as HTMLDivElement,
  footer: document.getElementById("footer") as HTMLDivElement,
  current: document.getElementById("current") as HTMLButtonElement,
  fizz: document.getElementById("fizz") as HTMLButtonElement,
  buzz: document.getElementById("buzz") as HTMLButtonElement,
  fizzbuzz: document.getElementById("fizzbuzz") as HTMLButtonElement,
};

// simpleBar
const simpleBar = new SimpleBar(component.wrapper);
const mainScreenScrollElement = simpleBar.getScrollElement();

// set dynamic style
const setStyle = () => {
  const vh = window.innerHeight;
  const { app, wrapper, header, footer } = component;

  app.style.height = `${vh}px`;
  app.style.display = "";
  header.style.height = `${vh * 0.1}px`;
  footer.style.height = `${vh * 0.1}px`;
  wrapper.style.height = `${vh - vh * 0.2}px`;
};

window.addEventListener("resize", setStyle);

const mainScreenScrollBottom = () => {
  mainScreenScrollElement.scroll({
    top: mainScreenScrollElement.scrollHeight,
    behavior: "smooth",
  });
};

// retry button node
const retryButton = document.createElement("button");
retryButton.classList.add("btn");
retryButton.textContent = "retry";

// add message to game screen
const sendMessage = (sender: string, message: string) => {
  Debug.showInfo();
  const node = document.createElement("div");
  node.classList.add("message", sender);
  node.innerText = `${sender}: ${message}`;
  component.main.appendChild(node);
  mainScreenScrollBottom();
};

// game controller
const game = {
  inputButton: [
    component.current,
    component.fizz,
    component.buzz,
    component.fizzbuzz,
  ],

  disableInput() {
    game.inputButton.forEach(e => {
      e.disabled = true;
    });
  },
  enableInput() {
    game.inputButton.forEach(e => {
      e.disabled = false;
    });
  },

  enemyAction() {
    const playerName = "enemy";
    let number: string;
    const rand = Math.random();
    const answer = toFizzBuzz(state.current_number);

    state.current_player = playerName;

    // send a wrong letter based on accuracy
    if (rand <= parameter.response_accuracy) {
      number = answer;
    } else {
      // select a wrong letter randomly
      const list = [String(state.current_number), "Fizz", "Buzz", "FizzBuzz"];
      list.splice(list.indexOf(answer), 1);
      number = list[Math.floor(Math.random() * list.length)];
    }

    sendMessage(playerName, number);
    console.table(state);
    if (!checkMessage(number, playerName)) {
      game.gameOver(playerName);
      return;
    }

    // refresh button number and count
    component.current.textContent = (state.current_number + 1).toString();
    state.current_number++;
  },

  poseInput(sec = parameter.response_speed) {
    game.stopInput();
    // resume game after sec[s]
    state.timer = window.setTimeout(() => {
      game.enemyAction();
      if (state.game_state === "playing") {
        game.resumeInput();
      }
    }, sec * 1000);
  },
  stopInput() {
    clearTimeout(state.timer);
    game.disableInput();
  },
  resumeInput() {
    clearTimeout(state.timer);
    game.enableInput();
  },
  gameOver(player: string) {
    game.stopInput();
    state.game_state = "over";

    sendMessage("system", `"${player}" failed.`);
    sendMessage("system", "Continue to play?");

    // add retry button
    component.footer.appendChild(retryButton);
  },
};

const toFizzBuzz = (number: number) => {
  if (number % 15 === 0) {
    return "FizzBuzz";
  } else if (number % 5 === 0) {
    return "Buzz";
  } else if (number % 3 === 0) {
    return "Fizz";
  } else {
    return number.toString();
  }
};

// check if pushed button is correct and player is valid
const checkMessage = (number: string, player: string) => {
  const checkAnswer = (number: string) => {
    return number === toFizzBuzz(state.current_number);
  };
  const checkPlayer = (player: string) => {
    return player === state.current_player;
  };
  return checkAnswer(number) && checkPlayer(player);
};

// for debug
class Debug {
  static status = document.createElement("p");
  static header = document.getElementById("header") as HTMLDivElement;

  constructor() {
    Debug.header.appendChild(Debug.status);
  }
  Foo = class {
    a = "a";
    Foo = class {
      a = "a";
    };
  };
  static showInfo() {
    console.table(state);
    let buff = "";
    for (const [key, value] of Object.entries(state)) {
      buff += `${key}: ${value}&emsp;`;
    }
    this.status.innerHTML = buff;
  }
}

const setup = () => {
  // initialize
  state.current_number = 1;
  state.current_player = "me";
  component.current.textContent = "1";

  // skip button settings when retry
  if (state.game_state === "init") {
    // assign buttons to send message
    game.inputButton.forEach(e => {
      e.addEventListener("click", () => {
        const playerName = "me";
        const selectedLetter = e.textContent ?? "";

        // TODO: if level is hard, do not stop input
        game.poseInput();
        state.current_player = playerName;

        sendMessage(playerName, selectedLetter);
        if (!checkMessage(selectedLetter, playerName)) {
          game.gameOver(playerName);
          return;
        }

        // refresh button number and count
        component.current.textContent = (state.current_number + 1).toString();
        state.current_number++;
      });
    });
  } else if (state.game_state === "over") {
    // remove retry button
    component.footer.removeChild(retryButton);
  }

  // prepare for game
  state.game_state = "playing";
  game.resumeInput();
};

// attach setup function to retry button
retryButton.addEventListener("click", setup);

const main = () => {
  setup();
  setStyle();
  new Debug();
};

main();
