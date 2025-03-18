import Plat from '../Models/Plat.js';
import Joi from 'joi';

class Meal {

    static async getAll(req, res) {
        try {
            const meals = await Plat.findAll();
            
            if (meals.length === 0) {
                return res.status(404).json({
                    message: '😓 No meals found.',
                    data: meals
                });
            }
        
            res.status(200).json({
                message: '✅ Meals fetched successfully',
                data: meals
            });
        } catch (err) {
            res.status(500).json({
                message: '😖 Error fetching meals',
                error: err.message
            });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const meal = await Plat.findById(id);
            
            if (meal.length === 0) {
                return res.status(404).json({
                    message: `😓 Meal with ID ${id} not found.`,
                    data: meal
                });
            }
            
            res.status(200).json({
                message: '✅ Meal fetched successfully',
                data: meal
            });
            
        } catch (err) {
            res.status(500).json({
                message: `😖 Error fetching meal with id ${id}`,
                error: err.message
            });
        }
    }

    static async getOne (req, res) {
        const name = req.query;
        try {
            const meal = await Plat.findOne(name);
            
            if (!meal) {
                return res.status(404).json({
                    message: `😓 No meal found with the name ${name}`
                });
            }
            
            res.status(200).json({
                message: '✅ Meal fetched successfully',
                data: meal
            });
            
        } catch (err) {
            res.status(500).json({
                message: `😖 Error fetching meal with name ${name}`,
                error: err.message
            });
        }
    }

    static async Create(req, res) {
        const schema = Joi.object({
            designation: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            image: Joi.string().required()
        });

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: '😓 Validation error',
                details: error.details
            });
        }

        try {
            const mealId = await Plat.Create(value);
            res.status(201).json({
                message: '✅ Meal created successfully',
                mealId: mealId
            });
        } catch (err) {
            res.status(500).json({
                message: '😖 Error creating meal',
                error: err.message
            });
        }
    }

    static async Update(req, res) {
        const { id } = req.params;
        const data = req.body;
        const schema = Joi.object({
            designation: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            image: Joi.string().required(),
            availabled: Joi.boolean().required()
        });
        const { error, value } = schema.validate(data);
        if (error) {
            return res.status(400).json({
                message: '😓 Validation error',
                details: error.details
            });
        }
        try {
            const updatedRows = await Plat.Update(id, value);
            if (updatedRows === 0) {
                return res.status(404).json({
                    message: `😓 Meal with ID ${id} not found or no change`
                });
            }
            res.status(200).json({
                message: '✅ Meal updated successfully',
                updatedRows: updatedRows
            });
            
        } catch (err) {
            res.status(500).json({
                message: '😖 Error updating meal',
                error: err.message
            });
        }
    }

    static async Delete(req, res) {
        const { id } = req.params;
        try {
            const deletedRows = await Plat.Delete(id);
            if (deletedRows === 0) {
                return res.status(404).json({
                    message: `😓 Meal with ID ${id} not found`
                });
            }
            res.status(200).json({
                message: '✅ Meal deleted successfully',
                deletedRows: deletedRows
            });
            
        } catch (err) {
            res.status(500).json({
                message: '😖 Error deleting meal',
                error: err.message
            });
        }
    }

    static async getTotal(req, res) {
        try {
            const totalmeals = await Plat.Count();
            res.status(200).json({
                message: '✅ Total meals fetched successfully',
                total: totalmeals
            });
            
        } catch (err) {
            res.status(500).json({
                message: '😖 Error fetching total meals',
                error: err.message
            });
        }
    }

}

export default Meal;