import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const {Pool} = pg;

const db = new Pool ({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "talff82533",
    database: "la_boleria"
})

export default db;