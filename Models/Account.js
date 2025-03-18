import Database from "../Config/database.js";

const db = Database.getInstance();

class Account {

    static async findAll () {
        const query = "SELECT * FROM account ORDER BY accountId ASC";
        try {
            console.log("🔍 Fetching all accounts...");
            const results = await db.query(query);
            if (results.length === 0) {
                console.warn('⚠️  No accounts found.');
                return [];
            }
            return results;
        } catch (err) {
            console.error('😞 Error fetching all accounts: ' + err.message);
        }
    }

    static async findById (id) {
        if (!id) {
            console.warn('❌ Account ID is required.');
        }

        const query = "SELECT * FROM account WHERE accountId = ?";
        try {
            console.log(`🔍 Fetching account with ID: ${id}...`);
            const results = await db.query(query, [id]);
            if (results.length === 0) {
                console.warn(`⚠️ Account with ID ${id} not found.`);
                return null;
            }
            return results[0];  // Retourne le premier compte trouvé
        } catch (err) {
            console.error('😞 Error fetching account by ID: ' + err.message);
        }
    }

    static async findOne(username, password) {
        if (!username || !password) {
            throw new Error('❌ Username and pawwsord are required.');
        }
    
        const query = "SELECT * FROM account WHERE username = ? AND mdpasse = ? "; 
        try {
            console.log(`🔍 Searching for account with username: ${username}...`);
            const results = await db.query(query, [username, password]);
    
            if (!results) {
                console.warn('⚠️ No account found.');
                return [];
            }
    
            return results; // Return single user object
        } catch (err) {
            console.error('😞 Error searching account:', err.message);
            throw err; // Rethrow the error to be handled by the caller
        }
    }
    

    static async filter(statut) {
        if (!statut) {
            console.warn('❌ Statut is required.');
            return [];
        }
    
        const statusMapping = { "active": "Enabled", "inactive": "Disabled" };
        const mappedStatus = statusMapping[statut] || statut; // Convertir si nécessaire
    
        const query = "SELECT * FROM account WHERE statut = ?";
        try {
            console.log(`🔍 Fetching accounts with status: ${mappedStatus}...`);
            const results = await db.query(query, [mappedStatus]);
            if (results.length === 0) {
                console.warn('⚠️ No accounts found with the specified status.');
                return [];
            }
            return results;
        } catch (err) {
            console.error('😞 Error filtering accounts by status: ' + err.message);
            return [];
        }
    }
    

    static async Create(account) {
        if (!account.username || !account.password) {
            throw new Error('❌ Username and Password are required.');
        }
    
        const query = "INSERT INTO account SET ?";
        try {
            console.log("➕ Creating a new account...");
            const [results] = await db.query(query, [account]); // Using parameterized queries
            return results.insertId; // Return the inserted account ID
        } catch (err) {
            console.error('😞 Error creating account:', err);
            throw err; // Rethrow the error for the caller to handle
        }
    }
    

    static async Update (id, data) {
        if (!id || !data) {
            console.warn('❌ Account ID and data are required.');
        }

        const query = "UPDATE account SET ? WHERE accountId = ?";
        try {
            console.log(`✏️ Updating account with ID: ${id}...`);
            const results = await db.query(query, [data, id]);
            if (results.affectedRows === 0) {
                console.warn(`⚠️ No account found with ID ${id} to update.`);
            }
            return results.affectedRows;  // Retourne le nombre de lignes affectées
        } catch (err) {
            console.error('😞 Error updating account: ' + err.message);
        }
    }

    static async Delete(id) {
        if (!id) {
            console.warn('❌ Account ID is required.');
        }

        const query = "DELETE FROM account WHERE accountId = ?";
        try {
            console.log(`🕑 Deleting account with ID: ${id}...`);
            const results = await db.query(query, [id]);
            if (results.affectedRows === 0) {
                console.warn(`⚠️ No account found with ID ${id} to delete.`);
            }
            return results.affectedRows;  // Retourne le nombre de lignes affectées
        } catch (err) {
            console.error('😞 Error deleting account: ' + err.message);
        }
    }

    static async Count() {
        const query = "SELECT COUNT(*) as total FROM account";
        try {
            console.log("🔢 Counting total accounts...");
            const results = await db.query(query);
            return results[0].total;  // Retourne le nombre total de compte
        } catch (err) {
            console.error('😞 Error counting accounts: ' + err.message);
        }
    }

    static async Enable(id) {
        if (!id) {
            console.warn('❌ Account ID is required.');
            return false; // Return early if id is missing
        }
        const query = "UPDATE account SET statut = 'Enabled' WHERE accountId = ?";
        try {
            const result = await db.query(query, [id]); // Pass the id parameter
            return true;
        } catch (error) {
            console.error('😞 Error enabling account: ' + error.message); // Use the correct error variable
            return false; // Return false if there was an error
        }
    }
    
    static async Disable(id) {
        if (!id) {
            console.warn('❌ Account ID is required.');
            return false; // Return early if id is missing
        }
        const query = "UPDATE account SET statut = 'Disabled' WHERE accountId = ?";
        try {
            const result = await db.query(query, [id]); // Pass the id parameter
            return true;
        } catch (error) {
            console.error('😞 Error disabling account: ' + error.message); // Use the correct error variable
            return false; // Return false if there was an error
        }
    }

}

export default Account;