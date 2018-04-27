const ONEMINUTEINSECONDS = 60;
let changeTitle = function () {
  if (this.mode === "") {
    document.title = "POMODORO TIME!";
  } else {
    document.title = this.mode.toUpperCase() + " TIME!";
  }
}
let countDown = function () {
  if (this.timer.remainingDuration === 0) {
    this.timer.remainingDuration = null;
    clearInterval(this.controller);
    this.$emit("switch-mode", this.timer.description);
  } else {
    this.timer.remainingDuration -= 1;
  }
}
let computedCSSClasses = function () {
  let temp = {};
  temp[this.timer.CSSClasses.static] = (this.mode === "") && !this.isTimerOn;
  temp[this.timer.CSSClasses.on] = (this.mode === this.timer.description) && this.isTimerOn;
  temp[this.timer.CSSClasses.off] = (this.mode !== this.timer.description) && this.isTimerOn;
  return temp;
}
/*let controller = function () {
  if ((this.mode === this.timer.description) && this.isTimerOn) {
    this.timer.remainingDuration = this.timer.fullDuration;
    return setInterval(this.countDown.bind(this), 1000);
  }
  return null;
}*/
let decrementByOneMinute = function (duration) {
  return (duration > 60) ? (duration - 60) : 60;
}
let formatDescription = function () {
  return this.timer.description.charAt(0).toUpperCase() + this.timer.description.slice(1) + " Time";
}
let formatTimerDisplay = function (timerDisplay) {
  let seconds = timerDisplay % 60;
  return Math.trunc(timerDisplay / 60) + ":" + ((seconds < 10) ? "0" : "") + seconds;
}
let incrementByOneMinute = function (duration) {
  return duration + 60;
}
let modeWatcher = function () {
  if (this.mode === this.timer.description) {
    this.timer.remainingDuration = this.timer.fullDuration;
    this.controller =  setInterval(this.countDown.bind(this), 1000);
  }
}
let stop = function () {
 if (!this.isTimerOn) {
    this.timer.remainingDuration = null;
    clearInterval(this.controller);
  }
}
let switchMode = function (currentMode) {
  if (currentMode === "break") {
    this.mode = "work";
  } else if (currentMode === "work") {
    this.mode = "break";
  }
}
let switchTimer = function () {
  if (this.isTimerOn) {
    this.mode = "";
  } else {
    this.mode = "work";
  }
  this.isTimerOn = !this.isTimerOn;
}
let timerDisplay = function () {
  return this.timer.remainingDuration || this.timer.fullDuration;
};
const buttonSpecs = {
  increment: {
    fontAwesomeIcon: "fa fa-caret-up",
    operation: incrementByOneMinute
  },
  decrement: {
    fontAwesomeIcon: "fa fa-caret-down",
    operation: decrementByOneMinute
  }
};
const areaSpecs = {
  break: {  //description matches key
    CSSClasses: {
      static: "break-area--default",
      off: 'break-area--darkBlue',
      on: 'break-area--lightBlue'
    },
    description: "break",
    fontAwesomeIcon: "fas fa-cloud",
    fullDuration: 5 * ONEMINUTEINSECONDS,
    remainingDuration: null
  },
  work: {
    CSSClasses: {
      static: "work-area--default",
      off: 'work-area--darkOrange',
      on: 'work-area--lightOrange'
    },
    description: "work",
    fontAwesomeIcon: "fas fa-check",
    fullDuration: 25 * ONEMINUTEINSECONDS,
    remainingDuration: null
  }
};
Vue.component("timer-operator", {
  props: ["button", "isTimerOn"],
  template: `
              <span v-on:click="$emit('change-full-duration', button.operation)">
                <i class="pointer"
                   v-bind:class="[{'seen': !isTimerOn, 'unseen': isTimerOn}, button.fontAwesomeIcon]">
                </i>
              </span>
            `
});
Vue.component("timer-area", {
  computed: {
    computedCSSClasses: computedCSSClasses,
    //controller: controller,
    timerDisplay: timerDisplay,
  },
  data: function () {
    return {
      buttonSpecs: buttonSpecs,
      controller: null
    };
  },
  methods: {
    countDown: countDown,
    formatDescription: formatDescription,
    formatTimerDisplay: formatTimerDisplay
  },
  watch: {
    isTimerOn: stop,
    mode: modeWatcher
  },
  props: ["isTimerOn", "mode", "timer"],
  template: `
              <div class="flex-container flex-container__div--side"
                v-bind:class="computedCSSClasses">
                <div class="flex-container__div--center">
                  <div>
                    {{formatDescription()}}
                  </div>
                  <timer-operator
                    v-bind:button="buttonSpecs.increment"
                    v-bind:is-timer-on="isTimerOn"
                    v-on:change-full-duration="timer.fullDuration=$event(timer.fullDuration)"/>
                  <div>
                    {{formatTimerDisplay(timerDisplay)}}
                  </div>
                  <timer-operator
                    v-bind:button="buttonSpecs.decrement"
                    v-bind:is-timer-on="isTimerOn"
                    v-on:change-full-duration="timer.fullDuration=$event(timer.fullDuration)"/>
                  <div>
                    <i v-bind:class="timer.fontAwesomeIcon"/>
                  </div>
                </div>
              </div>
            `
});
let app = new Vue ({
  el: "#app",
  data: {
    isTimerOn: false,
    mode: "", //"break" or "work"
    timers: areaSpecs
  },
  methods: {
    switchMode: switchMode,
    switchTimer: switchTimer
  },
  watch: {
    mode: changeTitle
  }
});
