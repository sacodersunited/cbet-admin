const fs = require("fs")
fs.writeFileSync("./.env", `CBET_AZURE_APPID=${process.env.CBET_AZURE_APPID}\n`)
