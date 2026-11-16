const express = require("express")
const authrouter = require("../src/rotues/auth.rotues")
const cookieParser = require("cookie-parser")

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authrouter)

module.exports = app;