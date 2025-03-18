import Database from "../Config/database.js";

const db = Database.getInstance();

class Supplier {

    static async findAll() {
        const query = "SELECT * FROM supplier";
        try {
            console.log("🔍 Fetching all suppliers...");
            const suppliers = await db.query(query);
            if (suppliers.length === 0) {
                console.warn('⚠️  No suppliers found.');
                return [];
            } 
            return suppliers;
        } catch (error) {
            console.error('😞 Error fetching all suppliers: ' + error.message);
            return [];
        }
    }

    static async findById(id) {
        if (!id) {
            console.warn('❌ supplier ID is required.');
        }
        const query = "SELECT * FROM supplier WHERE numSupply = ?";
        try {
            console.log("🔍 Fetching supplier by id: " + id);
            const supplier = await db.query(query, [id]);
            if (supplier.length === 0) {
                console.warn(`⚠️ Supplier with ID ${id} not found.`);
                return null;
            }
            return supplier[0];
        } catch (error) {
            console.error('😞 Error fetching supplier by ID: ' + error.message);
            return null;
        }
    }

    static async findOne(name) {
        if (!name) {
            console.warn('❌ Supplier name is required.');
        }
        const query = "SELECT * FROM supplier WHERE nameSupply=?";
        try {
            console.log("🔍 Searching for supplier with name: " + name);
            const supplier = await db.query(query, [name]);
            if (supplier.length === 0) {
                console.warn(`⚠️ Supplier with name ${name} not found.`);
                return null;
            }
            return supplier[0];
        } catch (error) {
            console.error('😞 Error searching for supplier by name: ' + error.message);
            return null;
        }
    }

    static async Create(supplier) {
        if (!supplier) {
            console.warn('❌ Supplier data is required.');
        }
        const query = "INSERT INTO supplier SET?";
        try {
            console.log("➕ Creating a new supplier...");
            const results = await db.query(query, supplier);
            return results.insertId;  // Retourne l'ID du fournisseur inséré
        } catch (error) {
            console.error('😞 Error creating supplier: ' + error.message);
            return null;
        }
    }
    
    static async Update(id, data) {
        if (!id || !data) {
            console.warn('❌ Supplier ID and data are required.');
        }
        const query = "UPDATE supplier SET ? WHERE numSupply = ?";
        try {
            console.log(`✏️ Updating supplier with ID: ${id}...`);
            const results = await db.query(query, [data, id]);
            if (results.affectedRows === 0) {
                console.warn(`⚠️ No supplier found with ID ${id} to update.`);
                return false;
            }
            return true;
        } catch (error) {
            console.error('😞 Error updating supplier: ' + error.message);
            return false;
        }
    }

    static async Delete(id) {
        if (!id) {
            console.warn('❌ Supplier ID is required.');
        }
        const query = "DELETE FROM supplier WHERE numSupply =?";
        try {
            console.log(`🕑 Deleting supplier with ID: ${id}...`);
            const results = await db.query(query, [id]);
            return results.affectedRows > 0;  // Retourne vrai si une ligne a été supprimée
        } catch (error) {
            console.error('😞 Error deleting supplier: ' + error.message);
            return false;
        }
    }

    static async Count() {
        const query = "SELECT COUNT(*) as count FROM supplier";
        try {
            console.log("🔢 Counting total suppliers...");
            const results = await db.query(query);
            return results[0].count;  // Retourne le nombre total de fournisseurs
        } catch (error) {
            console.error('😞 Error counting suppliers: ' + error.message);
            return 0;
        }
    }
}

export default Supplier;