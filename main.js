const db = require("./server/db/database");
const app = require("./server/index");
const PORT = process.env.PORT || 3000;

db.sync().then(() => {
  console.log("db synced");
  app.listen(PORT, () => console.log(`Listening studiously on port ${PORT}`));
});
