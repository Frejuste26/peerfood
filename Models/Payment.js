import Database from "../Config/database.js";

const db = Database.getInstance();

class Payment {

    static async findAll() {
        const query = `SELECT * FROM payments`;
        try {
            console.log("🔍 Fetching all payments...");
            const result = await db.query(query);
            if (result.length === 0) {
                console.warn('⚠️  No payments found.');
                return [];
            }
            return result;
        } catch (error) {
            console.error('😞 Error fetching all payments: ' + err.message);
        }
    }

    static async findById(id) {
        if (!id) {
            console.warn('❌ Payment ID is required.');
        }
        const query = `SELECT * FROM payments WHERE payCode = ?`;
        try {
            console.log("🔍 Fetching payment by id: " + id);
            const payment = await db.query(query, [id]);
            if (payment.length === 0) {
                console.warn(`⚠️ Payment with ID ${id} not found.`);
                return null;
            }
            return payment[0];
        } catch (err) {
            console.error('😞 Error fetching payment by ID: ' + err.message);
        }
    } 

    static async Create (payment) {
        if (payment.length === 0) {
            console.warn('❌ Payment is required.');
        }
        const query = "INSERT INTO payments SET ?";
        try {
            console.log("➕ Creating a new payment...");
            const results = await db.query(query, payment);
            return results.insertId;  // Retourne l'ID du paiement inséré
        } catch (err) {
            console.error('😞 Error creating payment: ' + err.message);
        }
    }

    static async Update (id, data) {
        if (!id || !data) {
            console.warn('❌ Payment ID and data are required.');
        }

        const query = "UPDATE payments SET ? WHERE idCat = ?";
        try {
            console.log(`✏️ Updating payment with ID: ${id}...`);
            const results = await db.query(query, [data, id]);
            if (results.affectedRows === 0) {
                console.warn(`⚠️ No payment found with ID ${id} to update.`);
            }
            return results.affectedRows;  // Retourne le nombre de lignes affectées
        } catch (err) {
            console.error('😞 Error updating payment: ' + err.message);
        }
    }

    static async Delete(id) {
        if (!id) {
            console.warn('❌ Payment ID is required.');
        }

        const query = "DELETE FROM payments WHERE idCat = ?";
        try {
            console.log(`🕑 Deleting payment with ID: ${id}...`);
            const results = await db.query(query, [id]);
            if (results.affectedRows === 0) {
                console.warn(`⚠️ No payment found with ID ${id} to delete.`);
            }
            return results.affectedRows;  // Retourne le nombre de lignes affectées
        } catch (err) {
            console.error('😞 Error deleting payment: ' + err.message);
        }
    }

    static async Count() {
        const query = "SELECT COUNT(*) as total FROM payments";
        try {
            console.log("🔢 Counting total payment...");
            const results = await db.query(query);
            return results[0].total;  // Retourne le nombre total des paiement
        } catch (err) {
            console.error('😞 Error counting payment: ' + err.message);
        }
    }

}

export default Payment;