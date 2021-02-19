<template>
  <div @click="$refs.cmd.focus()">
    <div ref="terminal" class="tm-shell-container">
      <div v-if="banner" class="tm-shell-banner">
        <h2 v-if="banner.header" style="letter-spacing: 4px">{{ banner.header }}</h2>
        <p v-if="banner.subHeader">{{ banner.subHeader }}</p>
        <p v-if="banner.helpHeader">{{ banner.helpHeader }}</p>
        <p></p>
      </div>
      <output ref="output"></output>
      <div id="input-line" class="input-line">
        <div class="prompt">
          <div v-if="banner.emoji.first && showEmoji">({{ banner.emoji.first }})</div>
          <div v-if="banner.emoji.second && !showEmoji">({{ banner.emoji.second }})</div>
          <div>{{ banner.sign ? banner.sign : '>>' }}</div>
        </div>

        <input
            v-model="value"
            ref="cmd"
            @keydown.enter="cmdEnter($event)"
            @keydown.up="historyUp()"
            @keydown.down="historyDown()"
            @keydown.tab="cmdTab($event)"
            class="cmdline"
            autofocus
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shell_input: {
      required: false
    },
    banner: {
      type: Object,
      required: false,
      default: () => {
        return {
          header: "Vue Shell",
          subHeader: "Shell is power just enjoy 🔥",
          helpHeader: 'Enter "help" for more information.',
          emoji: {
            first: "🔅",
            second: "🔆",
            time: 750
          },
          sign: "VueShell $"
        }
      }
    },
    commands: {
      type: Array
    }
  },
  data() {
    return {
      showEmoji: true,
      value: "",
      history: [],
      histPos: 0,
      histTemp: 0
    };
  },
  computed: {
    allcommands() {
      let tab = [
        {name: "help", desc: "Show all the commands that are available"},
        {name: "clear", desc: "Clear the terminal of all output"},
        {name: "admin", desc: "Login into Admin"},
      ];

      if (this.commands) {
        this.commands.forEach(({name, desc}) => {
          tab.push({name, desc});
        });
      }

      return tab;
    }
  },
  watch: {
    shell_input(val) {
      this.output(val);
      this.$parent.send_to_terminal = "";
    }
  },
  methods: {
    historyUp() {
      if (this.history.length) {
        if (this.history[this.histPos]) {
          this.history[this.histPos] = this.value;
        } else {
          this.histTemp = this.value;
        }
      }
      // up 38
      this.histPos--;
      if (this.histPos < 0) {
        this.histPos = 0;
      }
      this.value = this.history[this.histPos]
          ? this.history[this.histPos]
          : this.histTemp;
    },
    historyDown() {
      if (this.history.length) {
        if (this.history[this.histPos]) {
          this.history[this.histPos] = this.value;
        } else {
          this.histTemp = this.value;
        }
      }
      this.histPos++;
      if (this.histPos > this.history.length) {
        this.histPos = this.history.length;
      }
      this.value = this.history[this.histPos]
          ? this.history[this.histPos]
          : this.histTemp;
    },
    cmdTab(e) {
      e.preventDefault();
    },
    cmdEnter() {
      if (this.value) {
        this.history[this.history.length] = this.value;
        this.histPos = this.history.length;
      }

      //   Duplicate current input and append to output section.
      const line = this.$refs.cmd.parentNode.cloneNode(true);
      line.removeAttribute("id");
      line.classList.add("line");
      const input = line.querySelector("input.cmdline");
      input.autofocus = false;
      input.readOnly = true;
      this.$refs.output.appendChild(line);

      if (this.value && this.value.trim()) {
        let args = this.value.split(" ").filter((val) => {
          return val;
        })
        var cmd = args[0].toLowerCase();
        args = args.splice(1); // Remove cmd from arg list.
      }

      if (cmd == "clear") {
        this.$refs.output.innerHTML = "";
        this.value = "";
      } else if (cmd == "help") {
        let commandsList = this.allcommands.map(({name, desc}) => {
          if (desc) {
            return `<span class="tm-label-success">${name}</span>${desc}`;
          }

          return name;
        });

        this.output(
            '<div class="ls-files">' + commandsList.join("<br>") + "</div>"
        );
      } else if (cmd == "admin") {
        let commandsList = this.allcommands.map(({name, desc}) => {
          if (desc) {
            return `<span class="tm-label-success">${name}</span>${desc}`;
          }

          return name;
        });

        this.output(
            '<div class="ls-files">' + commandsList.join("<br>") + "</div>"
        );
      } else {
        if (this.commands) {
          this.commands.forEach(a => {
            if (cmd == a.name) {
              this.output(a.get());
              return;
            }
          });
        }
        if (this.value.trim() != "") {
          this.$emit("shell_output", this.value);
        }
        this.value = "";
      }

      // Clear/setup line for next input.
    },
    output(html) {
      this.$refs.output.insertAdjacentHTML(
          "beforeEnd",
          `<div>${html}</div>`
      );
      this.value = "";
    }
  },
  mounted() {
    if (
        this.banner.emoji.first &&
        this.banner.emoji.second &&
        this.banner.emoji.time
    ) {
      setInterval(() => {
        this.showEmoji = !this.showEmoji;
      }, this.banner.emoji.time);
    }
  }
};
</script>

<style lang="scss">
.tm-shell-container {
  height: 100%;

  output {
    clear: both;
    width: 100%;
  }

  .tm-shell-banner {
    margin-bottom: 24px;
  }
}


img {
  margin-right: 20px;
}

.input-line {
  display: flex;
}

.input-line > div:nth-child(2) {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
}

.prompt {
  white-space: nowrap;
  color: #3a8b17;
  margin-right: 7px;
  display: -webkit-box;
  display: -moz-box;
  display: box;
  box-pack: center;
  box-orient: vertical;
  user-select: none;
}

.cmdline {
  outline: none;
  background-color: transparent;
  margin: 0;
  width: 100%;
  font: inherit;
  border: none;
  color: inherit;
}

.ls-files {
  line-height: 20px;
}

[class^="tm-label-"] {
  padding: 0 4px;
  margin-right: $tm-basic-unit;
  color: $tm-color-bg;
}

.tm-label-success {
  background: $tm-color-success;
}

.tm-label-info {
  background: $tm-color-info;
}

.tm-label-warning {
  background: $tm-color-warning;
}

.tm-label-error {
  background: $tm-color-error;
}

</style>
