import { buildApp } from "./app.js";

const app = buildApp();

app.listen({ port: 5000 }).then(() => {
  console.log(`Server running at http://localhost:5000`);
});
