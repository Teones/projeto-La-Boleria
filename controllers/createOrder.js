import db from "../config/db.js";

export async function createOrder (req, res) {
    const {clientId, cakeId, quantity, totalPrice} = req.body

    try {
        const client = await db.query(`SELECT * FROM clients WHERE id = $1`, [clientId]);
        const cake = await db.query(`SELECT * FROM cakes WHERE id = $1`, [cakeId]);
        if(client.rowCount === 0 || cake.rowCount === 0) {
            return res.sendStatus(404) // Not Found
        }

        if(cake.rows[0].price !== (totalPrice / quantity).toFixed(2)) {
            return res.status(404).send("Valor inconforme") // Not Found
        }

        await db.query(`
        INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice")
        VALUES ($1, $2, $3, $4)
        `, [clientId, cakeId, quantity, totalPrice])

        return res.sendStatus(201) // created
    } catch (error) {
        console.log(error);
        return res.sendStatus(500); // internal server error
    }
}