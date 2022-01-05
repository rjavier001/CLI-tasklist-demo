require("colors");
const { displayMenu, onPause } = require("./helpers/messages");

console.clear();
const main = async () => {
  let opt = "";
  do {
    opt = await displayMenu();
    console.log({ opt });
    if (opt !== "0") await onPause();
  } while (opt !== "0");
};

main();
