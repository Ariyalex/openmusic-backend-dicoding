const app = require("./src/app");

const HOST = process.env.HOST || "localhost";
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`server berjalan di http://${HOST}:${PORT}`);
});
