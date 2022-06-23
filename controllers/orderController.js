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

export async function getOrderById (req, res) {
    const id = req.params.id;
    try {
        const searchId = await db.query(`SELECT * FROM orders WHERE id = $1`, [id]);
        if(searchId.rowCount === 0) {
            return res.sendStatus(404) // Not Found
        }

        const {rows} = await db.query(`
        SELECT orders.*, clients.*, cakes.*, clients.name AS "clientName" FROM orders
        JOIN clients
        ON orders."clientId" = clients.id
        JOIN cakes
        ON orders."cakeId" = cakes.id
        WHERE orders.id = $1
        `, [id])
        const result = rows[0]
        const objetc = {
            "client": {
                "id": result.clientId,
                "name": result.clientName,
                "address": result.address,
                "phone": result.phone
            },
            "cake": {
                "id": result.cakeId,
                "name": result.name,
                "price": result.price,
                "description": result.description,
                "image": result.image
            },
            "createdAt": result.createdAt,
            "quantity": result.quantity,
            "totalPrice": result.totalPrice,
        }

        return res.status(200).send(objetc) // OK
    } catch (error) {
        console.log(error);
        return res.sendStatus(500); // internal server error
    }
}

export async function getOrderByClientId (req, res) {
    const id = req.params.id;

    try {
        const {rows} = await db.query(`
        SELECT o.id AS "orderId", o.quantity, o."createdAt", o."totalPrice", c.name
        FROM orders o
        JOIN cakes c
        ON o."cakeId" = c.id
        WHERE "clientId" = $1
        `, [id]);
        if(rows.rowCount === 0) {
            return res.sendStatus(404) // Not Found
        }

        return res.status(200).send(rows) // OK
    } catch (error) {
        console.log(error);
        return res.sendStatus(500); // internal server error
    }
}