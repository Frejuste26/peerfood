import Database from "../Config/database.js";

const db = Database.getInstance();

class Category {

    
    static async findAll() {
        const query = `SELECT * FROM categories`;
        try {
            console.log("🔍 Fetching all categorys...");
            const categorys = await db.query(query);
            if (categorys.length === 0) {
                console.warn('⚠️  No categorys found.');
                return [];
            }
            return categorys;
        } catch (error) {
            console.error('😞 Error fetching all categorys: ' + err.message);
        }
    }

    static async findById(id) {
        if (!id) {
            console.warn('❌ Category ID is required.');
        }
        const query = `SELECT * FROM categories WHERE idCat = ?`;
        try {
            console.log("🔍 Fetching category by id: " + id);
            const category = await db.query(query, [id]);
            if (category.length === 0) {
                console.warn(`⚠️ Category with ID ${id} not found.`);
                return null;
            }
            return category[0];
        } catch (err) {
            console.error('😞 Error fetching category by ID: ' + err.message);
        }
    } 

    static async findOne(category){
        if (!category) {
            console.warn('❌ Category is required.');
        }
        const query = `SELECT * FROM categories WHERE designation =?`;
        try {
            console.log("🔍 Searching for category with name: " + category);
            const results = await db.query(query, [category]);
            if (results.length === 0) {
                console.warn('⚠️ No category found matching the search criteria.');
                return null;
            }
            return results[0];
        } catch (err) {
            console.error('😞 Error searching for category: ' + err.message);
        }
    }

    static async Create (category) {
        if (category.length === 0) {
            console.warn('❌ Category is required.');
        }
        const query = "INSERT INTO categories SET ?";
        try {
            console.log("➕ Creating a new category...");
            const results = await db.query(query, category);
            return results.insertId;  // Retourne l'ID de la category inséré
        } catch (err) {
            console.error('😞 Error creating category: ' + err.message);
        }
    }

    static async Update (id, data) {
        if (!id || !data) {
            console.warn('❌ Category ID and data are required.');
        }

        const query = "UPDATE categories SET ? WHERE idCat = ?";
        try {
            console.log(`✏️ Updating category with ID: ${id}...`);
            const results = await db.query(query, [data, id]);
            if (results.affectedRows === 0) {
                console.warn(`⚠️ No category found with ID ${id} to update.`);
            }
            return results.affectedRows;  // Retourne le nombre de lignes affectées
        } catch (err) {
            console.error('😞 Error updating category: ' + err.message);
        }
    }

    static async Delete(id) {
        if (!id) {
            console.warn('❌ Category ID is required.');
        }

        const query = "DELETE FROM categories WHERE idCat = ?";
        try {
            console.log(`🕑 Deleting category with ID: ${id}...`);
            const results = await db.query(query, [id]);
            if (results.affectedRows === 0) {
                console.warn(`⚠️ No category found with ID ${id} to delete.`);
            }
            return results.affectedRows;  // Retourne le nombre de lignes affectées
        } catch (err) {
            console.error('😞 Error deleting category: ' + err.message);
        }
    }

    static async Count() {
        const query = "SELECT COUNT(*) as total FROM category";
        try {
            console.log("🔢 Counting total category...");
            const results = await db.query(query);
            return results[0].total;  // Retourne le nombre total des category
        } catch (err) {
            console.error('😞 Error counting category: ' + err.message);
        }
    }

}

export default Category;