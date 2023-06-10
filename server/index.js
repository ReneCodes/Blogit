const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

const router = require('./router');
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
