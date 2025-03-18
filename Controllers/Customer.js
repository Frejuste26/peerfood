import Customer from '../Models/Customer.js';
import Account from '../Models/Account.js';

// Contrôleur pour les clients
class Customers {

    // Récupérer tous les clients avec leurs comptes
    static async getAll(req, res) {
        try {
            const { status } = req.query; // 🔍 Récupérer le statut sélectionné
            let accounts;
    
            if (status) {
                accounts = await Account.filter(status); // Filtrer par statut
            } else {
                accounts = await Account.findAll(); // Récupérer tous les comptes
            }
    
            if (!accounts.length) {
                return res.status(404).json({ message: '😓 No accounts found.' });
            }
    
            // Récupérer tous les clients
            const customers = await Customer.findAll();
            if (!customers.length) {
                return res.status(404).json({ message: '😓 No customers found.' });
            }
    
            // Associer les comptes aux clients
            const customerMap = new Map(customers.map(c => [c.customerId, c]));
            const datas = accounts
                .filter(account => customerMap.has(account.customer))
                .map(account => {
                    const customer = customerMap.get(account.customer);
                    return {
                        id: account.accountId,
                        lastname: customer.lastname,
                        firstname: customer.firstname,
                        phone: customer.phone,
                        username: account.username,
                        type: account.Role,
                        status: account.statut
                    };
                });
    
            res.status(200).json({
                message: '✅ Customers fetched successfully',
                data: datas
            });
        } catch (err) {
            console.error("Error fetching customers:", err);
            res.status(500).json({
                message: '😖 Error fetching customers',
                error: err.message
            });
        }
    }    

    // Récupérer un client par ID
    static async getById(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: '❌ Customer ID is required.' });
        }

        try {
            const customer = await Customer.findById(id);
            if (!customer) {
                return res.status(404).json({
                    message: `😓 Client with ID ${id} not found`
                });
            }
            res.status(200).json({
                message: '✅ Client fetched successfully',
                data: customer
            });
        } catch (err) {
            console.error("Error fetching client by ID:", err);
            res.status(500).json({
                message: '😖 Error fetching client by ID',
                error: err.message
            });
        }
    }

    // Rechercher un client par nom ou prénom
    static async getOne(req, res) {
        const { searchItem } = req.query;
        if (!searchItem) {
            return res.status(400).json({ message: '❌ Search term is required.' });
        }

        try {
            const clients = await Customer.findOne(searchItem);
            if (!clients || clients.length === 0) {
                return res.status(404).json({
                    message: `😓 No clients found with the name ${searchItem}`
                });
            }
            res.status(200).json({
                message: '✅ Clients found successfully',
                data: clients
            });
        } catch (err) {
            console.error("Error searching clients:", err);
            res.status(500).json({
                message: '😖 Error searching clients',
                error: err.message
            });
        }
    }

    // Créer un nouveau client
    static async Create(req, res) {
        const { lastname, firstname, phone, email } = req.body;

        // 🔎 Validation des champs requis
        if (!lastname || !firstname || !phone || !email) {
            return res.status(400).json({ message: '⚠️ Tous les champs sont obligatoires' });
        }

        // 📌 Validation du format email et téléphone
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/; // Accepte entre 10 et 15 chiffres

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: '⚠️ Email invalide' });
        }
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: '⚠️ Numéro de téléphone invalide' });
        }

        try {
            // 🛑 Vérifier si l'email existe déjà
            const existingCustomer = await Customer.findByEmail(email);
            if (existingCustomer) {
                return res.status(409).json({ message: '⚠️ Un client avec cet email existe déjà' });
            }

            // 📊 Génération du code unique pour le client
            const customerCount = await Customer.count();
            const customerId = `CLD${(customerCount + 1).toString().padStart(4, '0')}`;

            // 🗓️ Date d'inscription
            const dateInsc = new Date();

            // 📌 Création des données du client
            const customer = { customerId, lastname, firstname, phone, email, dateInsc };
            const clientId = await Customer.create(customer);

            return res.status(201).json({
                message: '✅ Client créé avec succès',
                clientId: clientId
            });
        } catch (err) {
            console.error("Erreur lors de la création du client:", err);
            return res.status(500).json({
                message: '😖 Erreur lors de la création du client',
                error: err.message
            });
        }
    }

    // Mettre à jour un client
    static async Update(req, res) {
        const { id } = req.params;
        const data = req.body;

        if (!id || !data) {
            return res.status(400).json({ message: '❌ Customer ID and data are required.' });
        }

        try {
            const updatedRows = await Customer.update(id, data);
            if (updatedRows === 0) {
                return res.status(404).json({
                    message: `😓 Client with ID ${id} not found or no change`
                });
            }
            res.status(200).json({
                message: '✅ Client updated successfully',
                updatedRows: updatedRows
            });
        } catch (err) {
            console.error("Error updating client:", err);
            res.status(500).json({
                message: '😖 Error updating client',
                error: err.message
            });
        }
    }

    // Supprimer un client
    static async Delete(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: '❌ Customer ID is required.' });
        }

        try {
            const deletedRows = await Customer.delete(id);
            if (deletedRows === 0) {
                return res.status(404).json({
                    message: `😓 Client with ID ${id} not found`
                });
            }
            res.status(200).json({
                message: '✅ Client deleted successfully',
                deletedRows: deletedRows
            });
        } catch (err) {
            console.error("Error deleting client:", err);
            res.status(500).json({
                message: '😖 Error deleting client',
                error: err.message
            });
        }
    }

    // Compter le nombre total de clients
    static async getTotal(req, res) {
        try {
            const total = await Customer.count();
            res.status(200).json({
                message: '✅ Total number of clients fetched successfully',
                total: total
            });
        } catch (err) {
            console.error("Error counting clients:", err);
            res.status(500).json({
                message: '😖 Error counting clients',
                error: err.message
            });
        }
    }
}

export default Customers;