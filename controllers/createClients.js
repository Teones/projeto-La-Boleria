import db from "../config/db.js";

export async function createClients (req, res) {
    const {name, address, phone} = req.body

    try {
        const result = await db.query(`
            SELECT * FROM clients 
            WHERE name = $1 AND address = $2 AND phone = $3`
            , [name, address, phone])
        if (result.rowCount > 0) {
            return res.sendStatus(409) // conflict
        }
        
        await db.query(`
            INSERT INTO clients (name, address, phone)
            VALUES ($1, $2, $3)
        `, [name, address, phone])

        return res.sendStatus(201) // created
    } catch (error) {
        console.log(error);
        return res.sendStatus(500); // internal server error
    }
}