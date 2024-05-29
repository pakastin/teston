import t from "../src/index.js";

import deepEqual from "./deepequal.js";
import colors from "./colors.js";
import pass from "./pass.js";
import fail from "./fail.js";
import ok from "./ok.js";
import notOk from "./notok.js";
import equal from "./equal.js";
import throws from "./throws.js";

t("Test", (t) => {
  t("Colors", colors);
  t("t.pass", (t) => pass(t));
  t("t.fail", (t) => fail(t));
  t("t.ok", (t) => ok(t));
  t("t.notOk", (t) => notOk(t));
  t("t.equal", (t) => equal(t));
  t("t.deepEqual", (t) => deepEqual(t));
  t("t.throws", (t) => throws(t));
  t("Timeout", (t) => {
    t.plan(1);

    const test = t.createTest({
      failed() {
        t.pass("Timeout");
      },
    });

    test("Never finish", (t) => {
      t.timeout = 1000;
      t.plan(1);
    });
  });
});
