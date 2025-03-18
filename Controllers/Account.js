import Account from "../Models/Account.js";
import bcrypt from "bcrypt";

class Accounts {

    static async getAll(req, res) {
        try {
            const accounts = await Account.findAll();

            if (accounts.length === 0) {
                return res.status(404).json({
                    message: '😓 No accounts found.'
                });
            }

            res.status(200).json({
                message: '✅ Accounts fetched successfully',
                data: accounts
            });
        } catch (err) {
            res.status(500).json({
                message: '😖 Error fetching accounts',
                error: err.message
            });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;

        // Vérifier si l'utilisateur courant est un 'current' et si l'ID correspond à son propre ID
        if (req.user.type === 'student' || req.user.type === 'teacher' && req.user.id !== id) {
            return res.status(403).json({
                message: '🚫 Access denied. You can only access your own account.'
            });
        }

        try {
            const account = await Account.findById(id);
            if (!account) {
                return res.status(404).json({
                    message: `😓 Account with ID ${id} not found`
                });
            }
            res.status(200).json({
                message: '✅ Account fetched successfully',
                data: account
            });
        } catch (err) {
            res.status(500).json({
                message: '😖 Error fetching account by ID',
                error: err.message
            });
        }
    }

    static async getOne(req, res) {
        const username = req.query.username; // Corriger la récupération du username
        try {
            const account = await Account.findOne(username);
            if (!account || account.length === 0) {
                return res.status(404).json({
                    message: `😓 No accounts found with the username ${username}`
                });
            }
            res.status(200).json({
                message: '✅ Account found successfully',
                data: account
            });
        } catch (err) {
            res.status(500).json({
                message: '😖 Error searching accounts',
                error: err.message
            });
        }
    }

    static async Create(req, res) {
        const { customerId, username, password, Role } = req.body
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const account = {
                customerId,
                username,
                password: hashedPassword,
                Role
            };
            const accountId = await Account.Create(account);
            res.status(201).json({
                message: '✅ account created successfully',
                accountId: accountId
            });
        } catch (err) {
            res.status(500).json({
                message: '😖 Error creating account',
                error: err.message
            });
        }
    }

    static async Update(req, res) {
        const { id } = req.params;
        const data = req.body; // Données à mettre à jour

        // Vérifier si l'utilisateur courant est un 'current' et si l'ID correspond à son propre ID
        if (req.user.type === 'student' || req.user.type === 'teacher' && req.user.id !== id) {
            return res.status(403).json({
                message: '🚫 Access denied. You can only update your own account.'
            });
        }

        try {
            const updatedRows = await Account.Update(id, data);
            if (updatedRows === 0) {
                return res.status(404).json({
                    message: `😓 Account with ID ${id} not found or no change`
                });
            }
            res.status(200).json({
                message: '✅ Account updated successfully',
                updatedRows: updatedRows
            });
        } catch (err) {
            res.status(500).json({
                message: '😖 Error updating account',
                error: err.message
            });
        }
    }

    static async Delete(req, res) {
        const { id } = req.params;

        // Vérifier si l'utilisateur courant est un 'current' et si l'ID correspond à son propre ID
        if (req.user.type === 'student' || req.user.type === 'teacher' && req.user.id !== id) {
            return res.status(403).json({
                message: '🚫 Access denied. You can only delete your own account.'
            });
        }

        try {
            const deletedRows = await Account.Delete(id);
            if (deletedRows === 0) {
                return res.status(404).json({
                    message: `😓 Account with ID ${id} not found`
                });
            }
            res.status(200).json({
                message: '✅ Account deleted successfully',
                deletedRows: deletedRows
            });
        } catch (err) {
            res.status(500).json({
                message: '😖 Error deleting account',
                error: err.message
            });
        }
    }

    static async getTotal(req, res) {
        try {
            const total = await Account.Count();
            res.status(200).json({
                message: '✅ Total number of account fetched successfully',
                total: total
            });
        } catch (err) {
            res.status(500).json({
                message: '😖 Error counting accounts',
                error: err.message
            });
        }
    }
    static async EnableAccount(req, res) {
        try {
            const { id } = req.params;
    
            // Check if id is missing
            if (!id) {
                return res.status(400).json({
                    message: '❌ Account ID is required',
                });
            }
    
            const response = await Account.Enable(id);
    
            // If the account was not found or already enabled
            if (response === false) {
                return res.status(404).json({
                    message: `😓 Account with ID ${id} not found or already enabled`,
                });
            }
    
            // Success response
            res.status(200).json({
                message: '✅ Account enabled successfully',
            });
    
        } catch (error) {
            console.error('😖 Error enabling account:', error.message); // Log the error for debugging
            res.status(500).json({
                message: '😖 Error enabling account',
                error: error.message,
            });
        }
    }
    
    static async DisableAccount(req, res) {
        try {
            const { id } = req.params;
    
            // Check if id is missing
            if (!id) {
                return res.status(400).json({
                    message: '❌ Account ID is required',
                });
            }
    
            const response = await Account.Disable(id);
    
            // If the account was not found or already disabled
            if (response === false) {
                return res.status(404).json({
                    message: `😓 Account with ID ${id} not found or already disabled`,
                });
            }
    
            // Success response
            res.status(200).json({
                message: '✅ Account disabled successfully',
            });
    
        } catch (error) {
            console.error('😖 Error disabling account:', error.message); // Log the error for debugging
            res.status(500).json({
                message: '😖 Error disabling account',
                error: error.message,
            });
        }
    }

}

export default Accounts;
