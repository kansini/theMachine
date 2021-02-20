<template>
  <div
      ref="terminal"
      class="terminal"
      tabindex="0"
      :style="terminalSizeStyle"
      @keypress="inputText($event)"
      @keydown.left="leftArrow"
      @keydown.right="rightArrow"
      @keydown.delete="deleteChar($event.key)"
      @keydown.enter="enter"
  >
    <tm-terminal-header title="admin"/>
    <div class="tm-terminal-body">
      <div
          class="terminal-line"
          v-for="(line, index) in previousLines"
          :key="index"
      >
        <span class="terminal-prefix">{{ prefix }}</span>
        <span class="terminal-text">{{ line.text }}</span>
        <div
            class="terminal-text-line"
            v-for="result in line.result"
            :key="result"
        >
          <span class="terminal-text">{{ result }}</span>
        </div>
      </div>
      <div class="terminal-line">
        <span class="terminal-prefix">{{ prefix }}</span>
        <span class="terminal-text">{{ leftText }}</span>
        <span class="terminal-cursor"> {{ cursor }}</span>
        <span class="terminal-text">{{ rightText }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {computed, reactive, toRefs} from "vue"
import TmTerminalHeader from "./TerminalHeader.vue";

export default {
  props: {
    width: String,
    height: String,
    maxWidth: String,
    maxHeight: String,
  },
  components: {
    TmTerminalHeader
  },
  setup(props) {
    const terminal = reactive({
      prefix: "$",
      cursor: "|",
      terminalSizeStyle: computed(() => {
        const hyphenate = (str) =>
            str.replace(/\B([A-Z])/g, "-$1").toLowerCase();
        const keys = ["width", "height", "maxHeight", "maxWidth"];
        const strs = keys.map((key) =>
            props[key] ? `${hyphenate(key)}: ${props[key]};` : ""
        );
        return "".concat(...strs);
      }),
    });

    const text = reactive({
      leftText: "",
      rightText: "",
      previousLines: [],
      text: computed(() => text.leftText + text.rightText),
      inputText(event) {
        //Enter.charCode === 13
        if (event.charCode === 13) {
          return;
        }
        text.leftText += String.fromCharCode(event.charCode);
      },
      leftArrow() {
        text.rightText = text.leftText.slice(-1) + text.rightText;
        text.leftText = text.leftText.slice(0, -1);
      },
      rightArrow() {
        text.leftText += text.rightText.slice(0, 1);
        text.rightText = text.rightText.slice(1);
      },
      deleteChar(key) {
        if (key === "Delete") {
          text.rightText = text.rightText.slice(1);
        } else {
          text.leftText = text.leftText.slice(0, -1);
        }
      },
      enter() {
        text.previousLines.push({text: text.text, result: command.execute()});
        text.rightText = text.leftText = "";
      },
    });

    const builtInCommands = {
      clear: {
        description: "Clear all the texts.",
        handler: () => {
          text.previousLines = [];
        },
      },
      help: {
        description: "Show the helps.",
        handler: () => {
          const title = ["Vue3-Terminal", "Available commands:"];
          const commandDescriptions = Object.keys(command.commands).map(
              (key) => `${key} -- ${command.commands[key].description}`
          );
          return title.concat(...commandDescriptions);
        },
      },
      admin: {
        description: "Login into system.",
        handler: () => {
          terminal.prefix = 'admin >'
        }
      }
    };

    const command = reactive({
      texts: computed(() => text.text.split(" ")),
      command: computed(() => command.texts[0]),
      args: computed(() => command.texts.slice(1)),
      commands: {...builtInCommands},
      execute: () => {
        const cmd = command.command;
        const args = command.args;
        return cmd in command.commands
            ? command.commands[cmd].handler(args)
            : [`Unknown command '${cmd}'`];
      },
    });

    return {
      ...toRefs(terminal),
      ...toRefs(text),
      ...toRefs(command),
    };
  },
};
</script>

<style lang="scss" scoped>
.terminal {
  outline: none;
  font-family: "JetBrains Mono", "Source Code Pro", Monaco, Menlo, Consolas,
  "Courier New", Courier, monospace;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 560px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, .2);

  .tm-terminal-body {
    width: 100%;
    height: calc(100% - 24px);
    padding: 2px $tm-basic-unit;
    background: rgba(0, 0, 0, .9);
    backdrop-filter: blur(6px);
    overflow-y: scroll;
  }
}

.terminal-line {
  padding: 5px 10px;
  max-width: 100%;
}

.terminal-text-line {
  padding: 1px 0px;
  max-width: 100%;
}

.terminal-prefix {
  user-select: none;
  margin-right: 5px;
}

.terminal-text {
  max-width: 100%;
  word-wrap: break-word;
}

.terminal-cursor {
  user-select: none;
  animation: blink 1s infinite steps(1, start);
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
