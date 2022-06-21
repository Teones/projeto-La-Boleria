import db from "../config/db.js";

export async function createCake (req, res) {
    const {name, price, description, image} = req.body;
    
    try {
        const result = await db.query (`SELECT * FROM cakes WHERE name = $1`, [name]);
        if(result.rowCount > 0) {
            return res.sendStatus(409) // conflict
        };

        await db.query(`
            INSERT INTO cakes (name, price, description, image) 
            VALUES ($1, $2, $3, $4)
        `, [name, price, description, image]);

        return res.sendStatus(201); // created
    } catch (error) {
        console.log(error);
        return res.sendStatus(500); // internal server error
    }
}