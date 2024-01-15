const express = require("express");
const cors = require("cors");
const videosRoute = require("./routes/videos.js");
const app = express();
require("dotenv").config();
const {CORS_ORIGIN} = process.env;

app.use(cors({origin : CORS_ORIGIN}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/videos",videosRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

