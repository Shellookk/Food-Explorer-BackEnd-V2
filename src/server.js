require("express-async-errors")
require("dotenv/config")
const express = require("express")
const cors = require("cors")
const AppError = require("./utils/AppError")
const uploadsConfig = require("./config/upload")
const Routes = require("./routes")
const cookieParser = require("cookie-parser")

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://foodexplorershellookk.netlify.app"],
    credentials: true
}))


app.use(Routes)

app.use("/files", express.static(uploadsConfig.UPLOADS_FOLDER))

app.use((error, req, res, next) => {
    if(error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "Error",
            message: error.message
        })
    }

    console.log(error)

    return res.status(500).json({
        status: "Error",
        message: "Internal server Error"
    })
})

const port = process.env.SERVER_PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})