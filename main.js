const add = (total) => {
  return total + 1;
};
const less = (total) => {
  return (total - 1) < 1 ? 1 : total - 1;
};
const count = function () {
  this.counter = (this.counter + 1) % (60 * (this.total1 + this.total2));
};
const format = (amt) => {
  let afterColon = amt % 60;
  let prefix = (afterColon < 10) ? "0" : "";
  return Math.trunc(amt / 60) + ":" + prefix + afterColon;
}
let app = new Vue ({
  el: "#app",
  data: {
    total1: 5,
    total2: 25,
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
        return format(sec);
      }
      return format(this.total1 * 60);
    },
    show2: function () {
      if (this.isOn && (this.counter <= (this.total2 * 60))) {
        let sec = (this.total2 * 60) - this.counter;
        return format(sec);
      }
      return format(this.total2 * 60);
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
