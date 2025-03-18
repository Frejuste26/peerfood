import Supplier from "../Models/Supplier.js";
import Joi from "joi";

class Suppliers {

    static async getAll(req, res) {
        try {
            const suppliers = await Supplier.findAll();
            if (!suppliers || suppliers.length === 0) {
                return res.status(404).json({
                    message: '😓 No supplier found.',
                    data: suppliers
                });
            }
            return res.status(200).json({
                message: '✅ Suppliers fetched successfully',
                data: suppliers
            });
        } catch (err) {
            console.error('Error in getAll:', err);
            return res.status(500).json({
                message: '😖 Error fetching suppliers',
                error: err.message
            });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const supplier = await Supplier.findById(id);
            if (!supplier || supplier.length === 0) {
                return res.status(404).json({
                    message: `😓 Not Found supplier with ID ${id}`,
                    data: supplier
                });
            }
            return res.status(200).json({
                message: `✅ Supplier ${id} fetched successfully`,
                data: supplier
            });
        } catch (err) {
            console.error(`Error in getById for ID ${id}:`, err);
            return res.status(500).json({
                message: `😖 Error fetching supplier with ID ${id}`,
                error: err.message
            });
        }
    }

    static async findOne(req, res) {
        const { name } = req.params;
        try {
            const supplier = await Supplier.findOne(name);
            if (!supplier || supplier.length === 0) {
                return res.status(404).json({
                    message: `😓 Not Found supplier with name: ${name}`,
                    data: supplier
                });
            }
            return res.status(200).json({
                message: `✅ Supplier fetched successfully`,
                data: supplier
            });
        } catch (err) {
            console.error(`Error in findOne for name ${name}:`, err);
            return res.status(500).json({
                message: `😖 Error fetching supplier with name: ${name}`,
                error: err.message
            });
        }
    }

    static async Create(req, res) {
        const { nameSupply, telephone, address } = req.body;
    
        // Validation des champs requis
        if (!nameSupply || !telephone || !address) {
            return res.status(400).json({
                message: '⚠️ Tous les champs sont obligatoires : nameSupply, telephone, address.'
            });
        }
    
        try {
            // Génération du code unique pour le fournisseur
            const supplierCount = await Supplier.Count();
            const numSupply = `SUP${(supplierCount + 1).toString().padStart(4, '0')}`;
    
            // Création des données du fournisseur
            const supplier = { numSupply, nameSupply, telephone, address };
            const supplierId = await Supplier.Create(supplier);
    
            // Retourner la réponse réussie
            return res.status(201).json({
                message: '✅ Supplier created successfully',
                supplierId: supplierId
            });
    
        } catch (err) {
            console.error('Error in Create:', err);
            return res.status(500).json({
                message: '😖 Error creating supplier',
                error: err.message
            });
        }
    }

    static async Update(req, res) {
        const { numSupply } = req.params;
        const data = req.body;
        try {
            const updatedRow = await Supplier.Update(numSupply, data);
            if (!updatedRow || updatedRow.length === 0) {
                return res.status(404).json({
                    message: `😓 Supplier with ID ${numSupply} not found or no change`,
                    data: updatedRow
                });
            }
            return res.status(200).json({
                message: '✅ Supplier updated successfully',
                data: updatedRow
            });
        } catch (err) {
            console.error(`Error in Update for ID ${numSupply}:`, err);
            return res.status(500).json({
                message: '😖 Error updating supplier',
                error: err.message
            });
        }
    }

    static async Delete(req, res) {
        const { id } = req.params;
        
        if (!id) {
            console.error('ID manquant dans la requête');
            return res.status(400).json({
                message: '😖 ID du fournisseur manquant',
                error: 'ID is required'
            });
        }

        try {
            console.log(`Tentative de suppression du fournisseur ${id}`);
            
            // Vérifier d'abord si le fournisseur existe
            const existingSupplier = await Supplier.findById(id);
            if (!existingSupplier) {
                console.log(`Fournisseur ${id} non trouvé`);
                return res.status(404).json({
                    message: `😓 Fournisseur avec l'ID ${id} non trouvé`,
                    data: null
                });
            }

            // Procéder à la suppression
            const deletedRows = await Supplier.Delete(id);
            console.log(`Résultat de la suppression:`, deletedRows);

            if (!deletedRows || deletedRows === 0) {
                return res.status(404).json({
                    message: `😓 Échec de la suppression du fournisseur ${id}`,
                    data: null
                });
            }

            return res.status(200).json({
                message: `✅ Fournisseur ${id} supprimé avec succès`,
                data: deletedRows
            });
        } catch (err) {
            console.error(`Erreur lors de la suppression du fournisseur ${id}:`, err);
            return res.status(500).json({
                message: '😖 Erreur lors de la suppression du fournisseur',
                error: err.message
            });
        }
    }

    static async getTotal(req, res) {
        try {
            const total = await Supplier.Count();
            return res.status(200).json({
                message: '✅ Total number of supplier fetched successfully',
                total: total
            });
        } catch (err) {
            console.error('Error in getTotal:', err);
            return res.status(500).json({
                message: '😖 Error counting supplier',
                error: err.message
            });
        }
    }

}

export default Suppliers;