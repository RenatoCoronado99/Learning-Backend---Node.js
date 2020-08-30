const container = require("./src/startup/container");
const server = container.resolve("app");
  server
  .start()
  .catch(console.log);
