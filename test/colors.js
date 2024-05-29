import { red, green, grey, RED, GREEN, GREY, RESET } from "../src/colors.js";

export default (t) => {
  function createRef(color, message) {
    if (typeof window === "undefined") {
      return color + message + RESET;
    } else {
      return message;
    }
  }

  t("Green color", (t) => {
    t.plan(1);
    t.equal(green("green"), createRef(GREEN, "green"), "works");
  });
  t("Red color", (t) => {
    t.plan(1);
    t.equal(red("red"), createRef(RED, "red"), "works");
  });
  t("Grey color", (t) => {
    t.plan(1);
    t.equal(grey("grey"), createRef(GREY, "grey"), "works");
  });
};
