import createTest, { nextTick } from "./createtest.js";
import indent from "./indentation.js";
import { green, red } from "./colors.js";

let planned = 0;
let passed = 0;

const introduceParents = (t) => {
  const parents = [];
  let traverse = t;

  while (traverse) {
    if (traverse.introduced) {
      break;
    }
    parents.unshift(traverse);

    traverse = traverse.parent;
  }

  for (let i = 0; i < parents.length; i++) {
    const parent = parents[i];

    if (!parent.introduced) {
      parent.introduced = true;
      if (parent.description) {
        console.log("");
        console.log(indent(parent.depth) + parent.description);
      }
    }
  }
};

export default createTest({
  ready: false,
  planned(t, count) {
    planned += count;
  },
  passed(t, message) {
    passed++;
    introduceParents(t);
    console.log(indent(t.depth) + green("✓ " + message));
  },
  failed(t, message) {
    console.log(t);
    console.error(indent(t.depth) + red("𐄂 " + message));
    process.exit(1);
  },
  serve() {
    nextTick(() => {
      if (planned === passed) {
        if (this.ready) {
          return;
        }
        this.ready = true;
        console.log("");
        console.log(green("✓ All tests passed!"));
      }
    });
  },
});
