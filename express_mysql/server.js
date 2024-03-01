import app from "./app.js";

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
