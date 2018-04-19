/*class timeObject {
  constructor (time) {
    this.minute = time.minute;
    this.second = time.second;
  }

  function lessOneSecond () {
    if (this.second > 0) {
      this.second--;
    } else if (this.minute > 0){
      this.minute--;
      this.second = 59;
    }
  }

  function print () {
    return this.minute + ":" + this.second < 10 ? "0" + this.second : this.second;
  }

  function isZero () {
    return (this.minute + this.second) === 0;
  }
}*/
const add = (total) => {
  return total + 1;
};
const less = (total) => {
  return (total - 1) < 0 ? 0 : total - 1;
};
const count = function () {
  this.counter = (this.counter + 1) % (60 * (this.total1 + this.total2));
};
let app = new Vue ({
  el: "#app",
  data: {
    total1: 0,
    total2: 0,
    isOn: false,
    controller: null,
    counter: 0
  },
  methods: {
    add : add,
    less: less,
    count: count
  },
  computed: {
    show1: function () {
      if (this.isOn && (this.counter > (this.total1 * 60))) {
        let sec = ((this.total1 + this.total2) * 60) - this.counter;
        return Math.trunc(sec / 60) + ":" + (sec % 60);
      }
      return this.total1 + ":00";
    },
    show2: function () {
      if (this.isOn && (this.counter <= (this.total2 * 60))) {
        let sec = (this.total2 * 60) - this.counter;
        return Math.trunc(sec / 60) + ":" + (sec % 60);
      }
      return this.total2 + ":00";
    }
  },
  watch: {
    isOn: function () {
      if (this.isOn) {
        this.controller = setInterval(this.count.bind(this), 1000);
      } else {
        clearInterval(this.controller);
      }
    }
  }
});
