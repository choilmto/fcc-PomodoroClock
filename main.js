let connect = {
  count1: "total1",
  count2: "total2"
}
let other = {
  count1: "count2",
  count2: "count1"
}
const count = function () {
  if (this.state !== this[this.state].setLessASecond(this.state)) {
    this[this.state] = null;
    this.state = other[this.state];
    this[this.state] = new timeObjectClass(this[connect[this.state]]);
  }
};
class timeObjectClass {
  constructor (obj) {
    this.min = obj.min;
    this.sec = obj.sec;
  }
  setLessASecond (st) {
    if (this.sec === 0) {
      if (this.min > 0) {
        this.min--;
        this.sec = 60;
      } else {
        return other[st];
      }
    }
    this.sec--;
    return st;
  }
  setMoreAMin () {
    this.min++;
  }
  setLessAMin () {
    this.min = (this.min > 1) ? (this.min - 1) : 1;
  }
  get isZero () {
    return ((this.min === 0) && (this.sec === 0));
  }
  get getStr () {
    return this.min + ":" + ((this.sec < 10) ? "0" : "") + this.sec;
  }
}
let app = new Vue ({
  el: "#app",
  data: {
    total1: new timeObjectClass({min: 5, sec: 0}),
    total2: new timeObjectClass({min: 25, sec: 0}),
    isOn: false,
    controller: null,
    state: "",
    count1: null,
    count2: null
  },
  methods: {
    add1: function () {if (!this.isOn) {this.total1.setMoreAMin();}},
    less1: function () {if (!this.isOn) {this.total1.setLessAMin();}},
    add2: function () {if (!this.isOn) {this.total2.setMoreAMin();}},
    less2: function () {if (!this.isOn) {this.total2.setLessAMin();}},
    count: count
  },
  computed: {
    show1: function () {
      return this.count1 || this.total1;
    },
    show2: function () {
      return this.count2 || this.total2;
    },
    darkBlue: function () {
      return this.state === "count2";
    },
    darkOrange: function () {
      return this.state === "count1";
    },
    lightBlue: function () {
      return this.state === "count1";
    },
    lightOrange: function () {
      return this.state === "count2";
    }
  },
  watch: {
    isOn: function () {
      if (this.isOn) {
        this.state = "count2";
        this.count2 = new timeObjectClass(this.total2);
        this.controller = setInterval(this.count.bind(this), 1000);
      } else {
        clearInterval(this.controller);
        this[this.state] = null;
        this.state = "";
      }
    },
    state: function () {
      if (this.state === "") {
        document.title = "POMODORO TIME!";
      } else {
        document.title = this.state.toUpperCase() + " TIME!";
      }
    }
  }
});
