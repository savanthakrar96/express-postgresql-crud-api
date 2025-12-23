import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";

import userRoutes from "./routes/userRoutes.js"
import errorHandling from "./middlewears/errorHandler.js";
import creatUserTable from "./data/createUserTable.js";

dotenv.config()


const app = express();
const port = process.env.PORT || 3001;

//middlewears
app.use(express.json());
app.use(cors());

// routes
app.use("/api", userRoutes);

// Error handling middlewears
app.use(errorHandling)

//create table before starting server
creatUserTable();

//testing postgres connection 
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is : ${result.rows[0].current_database}`)
})


//server running

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})