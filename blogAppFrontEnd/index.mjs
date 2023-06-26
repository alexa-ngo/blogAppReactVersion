import express from "express";

const app = express();
app.use(express.static("statics"));

app.listen(3000, () => {
  console.log("Yay, the front end is working!!!");
});
