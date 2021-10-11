const { Deta } = require("deta");
require("dotenv").config()

const deta = Deta(process.env.DETA_PROJECT_KEY)

const db = deta.Base("dbName")

module.exports = db

