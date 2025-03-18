import Database from '../Config/database.js';

const db = Database.getInstance();

class Order {

    static async findAll() {
        const query = `SELECT * FROM orderst`;
        try {
            console.log("🔍 Fetching all orders...");
            const orders = await db.query(query);
            if (orders.length === 0) {
                console.warn('⚠️  No orders found.');
                return [];
            }
            return orders;
        } catch (error) {
            console.error('😞 Error fetching all orders: ' + err.message);
        }
    }

    static async findById(id) {
        if (!id) {
            console.warn('❌ Order ID is required.');
        }
        const query = `SELECT * FROM orderst WHERE codeOrder = ?`;
        try {
            console.log("🔍 Fetching order by id: " + id);
            const order = await db.query(query, [id]);
            if (order.length === 0) {
                console.warn(`⚠️ Order with ID ${id} not found.`);
                return null;
            }
            return order[0];
        } catch (err) {
            console.error('😞 Error fetching order by ID: ' + err.message);
        }
    } 

    static async Create (order) {
        if (order.length === 0) {
            console.warn('❌ Order is required.');
        }
        const query = "INSERT INTO orderst SET ?";
        try {
            console.log("➕ Creating a new order...");
            const results = await db.query(query, order);
            return results.insertId;  // Retourne l'ID du compte inséré
        } catch (err) {
            console.error('😞 Error creating order: ' + err.message);
        }
    }

    static async Update (id, data) {
        if (!id || !data) {
            console.warn('❌ Order ID and data are required.');
        }

        const query = "UPDATE orderst SET ? WHERE codeOrder = ?";
        try {
            console.log(`✏️ Updating order with ID: ${id}...`);
            const results = await db.query(query, [data, id]);
            if (results.affectedRows === 0) {
                console.warn(`⚠️ No order found with ID ${id} to update.`);
            }
            return results.affectedRows;  // Retourne le nombre de lignes affectées
        } catch (err) {
            console.error('😞 Error updating order: ' + err.message);
        }
    }

    static async Delete(id) {
        if (!id) {
            console.warn('❌ Order ID is required.');
        }

        const query = "DELETE FROM orderst WHERE codeOrder = ?";
        try {
            console.log(`🕑 Deleting order with ID: ${id}...`);
            const results = await db.query(query, [id]);
            if (results.affectedRows === 0) {
                console.warn(`⚠️ No order found with ID ${id} to delete.`);
            }
            return results.affectedRows;  // Retourne le nombre de lignes affectées
        } catch (err) {
            console.error('😞 Error deleting order: ' + err.message);
        }
    }

    static async Count() {
        const query = "SELECT COUNT(*) as total FROM orderst";
        try {
            console.log("🔢 Counting total orders...");
            const results = await db.query(query);
            return results[0].total;  // Retourne le nombre total de compte
        } catch (err) {
            console.error('😞 Error counting orders: ' + err.message);
        }
    }

}

export default Order;