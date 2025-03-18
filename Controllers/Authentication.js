import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import Account from '../Models/Account.js';

class Authentication {
    /**
     * Generate a JWT token for authentication.
     * @param {Object} account - Account data (id, username, type).
     * @returns {string} JWT token.
     */
    static generateToken(account) {
        return jwt.sign(
            {
                id: account.id,
                username: account.username,
                type: account.type,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
    }

    /**
     * Handle user registration.
     */
        static async Register(req, res) {
            // 🛑 Validation des entrées avec Joi
            const schema = Joi.object({
                customerId: Joi.string().required(),
                username: Joi.string().min(3).max(30).required(),
                password: Joi.string().min(8).required(),
                Role: Joi.string().valid('Administrator', 'Student', 'Teacher').required(),
            });
    
            const { error, value } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    message: '😖 Validation error',
                    details: error.details,
                });
            }
    
            try {
                // 🔎 Vérifier si l'utilisateur existe déjà (insensible à la casse)
                const existingUser = await Account.findOne(value.username);
    
                if (!existingUser) { // Vérification correcte
                    return res.status(409).json({
                        message: '⚠️ Username already exists',
                    });
                }
    
                // 🔐 Hachage sécurisé du mot de passe
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(value.password, salt);
    
                // 💾 Création du compte avec le mot de passe sécurisé
                const account = { 
                    customer: value.customerId,
                    username: value.username, 
                    mdpasse: hashedPassword,
                    Role: value.Role,
                };
    
                const accountId = await Account.Create(account);
    
                return res.status(201).json({
                    message: '✅ Account created successfully',
                    accountId,
                });
            } catch (err) {
                return res.status(500).json({
                    message: '😖 Error creating account',
                    error: err.message,
                });
            }
        }

    /**
     * Handle user login.
     */
    static async Login(req, res) {
        // 🛑 Validate input data
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().min(8).required(),
        });


        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: '😖 Validation error',
                details: error.details,
            });
        }

        console.log(value.username, value.password);

        try {
            const account = await Account.findOne(value.username, value.password);
            console.log(account);
            if (!account) {
                return res.status(404).json({
                    message: `😓 No account found with the username ${value.username}`,
                });
            }

            // 🔑 Generate token
            const token = Authentication.generateToken(account);

            res.cookie('token', token, { httpOnly: true, secure: true });
            res.redirect('/');
        } catch (err) {
            res.status(500).json({
                message: '😖 Error during login',
                error: err.message,
            });
        }
    }
}

export default Authentication;
