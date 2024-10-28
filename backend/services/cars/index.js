const express = require("express");
const app = express();

const config = require("../../pkg/config");
const db = require("../../pkg/db");
db.init();
const { getAll, getOne, create, update, remove } = require("./handlers/cars");

app.get("/api/cars", getAll);
app.get("/api/cars/:id", getOne);
app.post("/api/cars", create);
app.put("/api/cars", update);
app.delete("/api/cars", remove);

app.listen(config.getSection("services").cars.port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(
    "Service [cars] successfully started on port",
    config.getSection("services").cars.port
  );
});
