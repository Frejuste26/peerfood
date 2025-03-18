import Payment from '../Models/Payment.js';
import Joi from 'joi';

class Payments {

    static async getAll(req, res) {
        try {
            const payments = await Payment.findAll();
            if (payments.length === 0) {
                return res.status(404).json({
                    message: '😓 No payments found.'
                });
            }
            res.json({
                message: '✅ Payments fetched successfully',
                data: payments
            });
            
        } catch (error) {
            res.status(500).json({
                message: '😖 Error fetching payments',
                error: error.message
            });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const payment = await Payment.findById(id);
            if (!payment) {
                return res.status(404).json({
                    message: `😓 Payment with ID ${id} not found.`,
                    data: payment
                });
            }
            res.json({
                message: '✅ Payment fetched successfully',
                data: payment
            });
            
        } catch (error) {
            res.status(500).json({
                message: '😖 Error fetching payment by ID',
                error: error.message
            });
        }
    }

    static async Create(req, res) {
        const schema = Joi.object({
            payCode: Joi.string().required(),
            order: Joi.string().required(),
            payMethod: Joi.string().required(),
            amount: Joi.number().required(),
            numTransaction: Joi.string().required(),
            payDate: Joi.date().required(),
            payStatus: Joi.string().required()
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: '😓 Validation error',
                details: error.details
            });
        }
        try {
            const paymentId = await Payment.Create(value);
            res.status(201).json({
                message: '✅ Payment created successfully',
                paymentId: paymentId
            });
            
        } catch (error) {
            res.status(500).json({
                message: '😖 Error creating payment',
                error: error.message
            });
        }
    }

    static async Update(req, res) {
        const { id } = req.params;
        const data = req.body; // Données à mettre à jour
        try {
            const updatedRows = await Payment.Update(data, id);
            if (updatedRows === 0) {
                return res.status(404).json({
                    message: `😓 Payment with ID ${id} not found.`
                });
            }
            res.json({
                message: '✅ Paymet updated successfully',
                updatedRows: updatedRows
            });
            
        } catch (error) {
            res.status(500).json({
                message: '😖 Error updating payment',
                error: error.message
            });
        }
    }

    static async Delete(req, res) {
        const { id } = req.params;
        try {
            const deletedRows = await Payment.Delete(id);
            if (deletedRows === 0) {
                return res.status(404).json({
                    message: `😓 Payment with ID ${id} not found.`
                });
            }
            res.json({
                message: '✅ Payment deleted successfully',
                deletedRows: deletedRows
            });
            
        } catch (error) {
            res.status(500).json({
                message: '😖 Error deleting payment',
                error: error.message
            });
        }
    }

    static async getTotal(req, res) {
        try {
            const total = await Payment.Count();
            res.json({
                message: '✅ Total number of payments fetched successfully',
                total: total
            });
            
        } catch (error) {
            res.status(500).json({
                message: '😖 Error counting payments',
                error: error.message
            });
        }
    }

}

export default Payments;