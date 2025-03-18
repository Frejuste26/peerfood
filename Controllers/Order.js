import Order from '../Models/Order.js';
import Joi from 'joi';

// Contrôleur pour les commandes
class Orders {

    static async getAll(req, res) {
        try {
            const orders = await Order.findAll();
            if (orders.length === 0) {
                return res.status(404).json({
                    message: '😓 No orders found.'
                });
            }
            res.json({
                message: '✅ Orders fetched successfully',
                data: orders
            });
            
        } catch (error) {
            res.status(500).json({
                message: '😖 Error fetching orders',
                error: error.message
            });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const order = await Order.findByPk(id);
            if (!order) {
                return res.status(404).json({
                    message: `😓 Order with ID ${id} not found.`
                });
            }
            res.json({
                message: '✅ Order fetched successfully',
                data: order
            });
            
        } catch (error) {
            res.status(500).json({
                message: '😖 Error fetching order by ID',
                error: error.message
            });
        }
    }

    static async Create(req, res) {
        const schema = Joi.object({
            codeOrder: Joi.string().required(),
            plat: Joi.number().required(),
            customer: Joi.number().required(),
            category: Joi.number().required(),
            orderDate: Joi.date().required(),
            orderTime: Joi.string().required(),
            orderPrice: Joi.number().required(),
            numPayment: Joi.number().required(),
            orderStatus: Joi.string().required(),
            paymentMethod: Joi.string().required()
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: '😓 Validation error',
                details: error.details
            });
        }
        try {
            const orderId = await Order.Create(value);
            res.status(201).json({
                message: '✅ Order created successfully',
                orderId: orderId
            });
            
        } catch (error) {
            res.status(500).json({
                message: '😖 Error creating order',
                error: error.message
            });
        }
    }

    static async Update(req, res) {
        const { id } = req.params;
        const data = req.body; // Données à mettre à jour
        try {
            const updatedRows = await Order.Update(data, id);
            if (updatedRows === 0) {
                return res.status(404).json({
                    message: `😓 Order with ID ${id} not found.`
                });
            }
            res.json({
                message: '✅ Order updated successfully',
                updatedRows: updatedRows
            });
            
        } catch (error) {
            res.status(500).json({
                message: '😖 Error updating order',
                error: error.message
            });
        }
    }

    static async Delete(req, res) {
        const { id } = req.params;
        try {
            const deletedRows = await Order.Delete(id);
            if (deletedRows === 0) {
                return res.status(404).json({
                    message: `😓 Order with ID ${id} not found.`
                });
            }
            res.json({
                message: '✅ Order deleted successfully',
                deletedRows: deletedRows
            });
            
        } catch (error) {
            res.status(500).json({
                message: '😖 Error deleting order',
                error: error.message
            });
        }
    }

    static async getTotal(req, res) {
        try {
            const total = await Order.Count();
            res.json({
                message: '✅ Total number of orders fetched successfully',
                total: total
            });
            
        } catch (error) {
            res.status(500).json({
                message: '😖 Error counting orders',
                error: error.message
            });
        }
    }

}

export default Orders;