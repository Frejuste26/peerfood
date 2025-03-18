import Database from "../Config/database.js";

// Connect to the database
const db = Database.getInstance();

class Plat {

    static async findAll() {
        const query = `SELECT * FROM plats ORDER BY idPlat DESC`;
        try {
            console.log("🔍 Fetching all meals...");
            const plats = await db.query(query);
            if (plats.length === 0) {
                console.warn('⚠️  No meals found.');
                return [];
            }
            return plats;
        } catch (error) {
            console.error('😞 Error fetching all meals: ' + error.message);
            return [];
        }
    }

    static async findById(id) {
        if (!id) {
            console.warn('❌ Meal ID is required.');
            return null;
        }
        const query = `SELECT * FROM plats WHERE idPlat =?`;
        try {
            console.log(`🔍 Fetching meal with ID ${id}...`);
            const plat = await db.query(query, [id]);
            if (plat.length === 0) {
                console.warn(`⚠️ Meal with ID ${id} not found.`);
                return null;
            }
            return plat[0];
        } catch (error) {
            console.error('😞 Error fetching meal by ID: ' + err.message);
        }
    }

    static async findOne(name) {
        if (!name) {
            console.warn('❌ Meal name is required.');
            return null;
        }
        const query = `SELECT * FROM plats WHERE designation =?`;
        try {
            console.log(`🔍 Fetching meal with name "${name}"...`);
            const plat = await db.query(query, [name]);
            if (plat.length === 0) {
                console.warn(`⚠️ Meal with name "${name}" not found.`);
                return null;
            }
            return plat[0];
        } catch (error) {
            console.error('😞 Error fetching meal by name: ' + err.message);
        }
    }

    static async Create(plat) {
        if (!plat) {
            console.warn('❌ Meal is required.');
            return null;
        }
        const query = `INSERT INTO plats (designation, prix, description, image) VALUES (?,?,?,?)`;
        try {
            console.log(`➕ Creating meal "${plat.designation}"...`);
            const results = await db.query(query, [plat]);
            return results.insertId;
        } catch (error) {
            console.error('😞 Error creating meal: ' + err.message);
            return null;
        }
    }
    
    static async Update(id, data) {
        if (!id || !data) {
            console.warn('❌ Meal ID and data are required.');
            return null;
        }
        const query = `UPDATE plats SET? WHERE idPlat =?`;
        try {
            console.log(`✏️ Updating meal with ID: ${id}...`);
            const results = await db.query(query, [data, id]);
            if (results.affectedRows === 0) {
                console.warn(`⚠️ No meal found with ID ${id} to update.`);
            }
            return results.affectedRows;
        } catch (error) {
            console.error('😞 Error Updating meal: ' + err.message);
            return null;
        }
    }
    
    static async Delete(id) {
        if (!id) {
            console.warn('❌ Meal ID is required.');
            return null;
        }
        const query = `DELETE FROM plats WHERE idPlat =?`;
        try {
            console.log(`🕑 Deleting meal with ID: ${id}...`);
            const results = await db.query(query, [id]);
            return results.affectedRows;
        } catch (error) {
            console.error('😞 Error deleting meal: ' + err.message);
            return null;
        }
    }

    static async Count() {
        const query = "SELECT COUNT(*) as total FROM plats";
        try {
            console.log("🔢 Counting total meals...");
            const results = await db.query(query);
            return results[0].total;
        } catch (error) {
            console.error('😞 Error counting meals: ' + err.message);
            return 0;
        }
    }

}

export default Plat;