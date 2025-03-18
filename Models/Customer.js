import Database from '../Config/database.js';

const db = Database.getInstance();

// Customer POO Object
class Customer {

    // Récupérer tous les clients
    static async findAll() {
        const query = "SELECT * FROM customer";
        try {
            console.log("🔍 Fetching all customers...");
            const customers = await db.query(query);
            if (customers.length === 0) {
                console.warn('⚠️ No customers found.');
                return [];
            }
            return customers;
        } catch (err) {
            console.error('😞 Error fetching all customers: ' + err.message);
            return [];
        }
    }

    // Récupérer un client par son ID
    static async findById(id) {
        if (!id) {
            console.warn('❌ Customer ID is required.');
            return null;
        }

        const query = "SELECT * FROM customer WHERE customerId = ?";
        try {
            console.log(`🔍 Fetching customer with ID: ${id}...`);
            const results = await db.query(query, [id]);
            if (results.length === 0) {
                console.warn(`⚠️ Customer with ID ${id} not found.`);
                return null;
            }
            return results[0];  // Retourne le premier client trouvé
        } catch (err) {
            console.error('😞 Error fetching customer by ID: ' + err.message);
            return null;
        }
    }

    // Rechercher un client par son nom ou prénom
    static async findOne(searchItem) {
        if (!searchItem) {
            console.warn('❌ Search term is required.');
            return [];
        }

        const query = "SELECT * FROM customer WHERE lastname LIKE ? OR firstname LIKE ?";
        try {
            console.log(`🔍 Searching for customers with name: ${searchItem}...`);
            const results = await db.query(query, [`%${searchItem}%`, `%${searchItem}%`]);
            if (results.length === 0) {
                console.warn('⚠️ No customers found matching the search criteria.');
                return [];
            }
            return results;
        } catch (err) {
            console.error('😞 Error searching customer: ' + err.message);
            return [];
        }
    }

    // Créer un nouveau client
    static async create(customer) {
        if (!customer?.firstname || !customer?.lastname) {
            console.warn('❌ Firstname and Lastname are required.');
            return null;
        }

        const query = "INSERT INTO customer SET ?";
        try {
            console.log("➕ Creating a new customer...");
            const results = await db.query(query, customer);
            return results.insertId;  // Retourne l'ID du client inséré
        } catch (err) {
            console.error('😞 Error creating customer: ' + err.message);
            return null;
        }
    }

    // Mettre à jour un client existant
    static async update(id, data) {
        if (!id || !data) {
            console.warn('❌ Customer ID and data are required.');
            return 0;
        }

        const query = "UPDATE customer SET ? WHERE customerId = ?";
        try {
            console.log(`✏️ Updating customer with ID: ${id}...`);
            const results = await db.query(query, [data, id]);
            if (results.affectedRows === 0) {
                console.warn(`⚠️ No customer found with ID ${id} to update.`);
            }
            return results.affectedRows;  // Retourne le nombre de lignes affectées
        } catch (err) {
            console.error('😞 Error updating customer: ' + err.message);
            return 0;
        }
    }

    // Supprimer un client
    static async delete(id) {
        if (!id) {
            console.warn('❌ Customer ID is required.');
            return 0;
        }

        const query = "DELETE FROM customer WHERE customerId = ?";
        try {
            console.log(`🕑 Deleting customer with ID: ${id}...`);
            const results = await db.query(query, [id]);
            if (results.affectedRows === 0) {
                console.warn(`⚠️ No customer found with ID ${id} to delete.`);
            }
            return results.affectedRows;  // Retourne le nombre de lignes affectées
        } catch (err) {
            console.error('😞 Error deleting customer: ' + err.message);
            return 0;
        }
    }

    // Compter le nombre total de clients
    static async count() {
        const query = "SELECT COUNT(*) as total FROM customer";
        try {
            console.log("🔢 Counting total customers...");
            const results = await db.query(query);
            return results[0].total;  // Retourne le nombre total de clients
        } catch (err) {
            console.error('😞 Error counting customers: ' + err.message);
            return 0;
        }
    }
}

export default Customer;