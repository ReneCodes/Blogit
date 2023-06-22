import dotenv from "dotenv";
dotenv.config();

import { app } from "./server";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
