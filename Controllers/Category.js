import Category from '../Models/Category.js';
import Joi from 'joi';

class Categorys {

    static async getAll(req, res) {
        try {
            const categorys = await Category.findAll();
            
            if (categorys.length === 0) {
                return res.status(404).json({
                    message: '😓 No categories found.',
                    data: categorys
                });
            }
        
            res.status(200).json({
                message: '✅ Categories fetched successfully',
                data: categorys
            });
        } catch (err) {
            res.status(500).json({
                message: '😖 Error fetching categories',
                error: err.message
            });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const category = await Category.findByPk(id);
            
            if (!category) {
                return res.status(404).json({
                    message: `😓 Category with ID ${id} not found.`
                });
            }
            
            res.status(200).json({
                message: '✅ Category fetched successfully',
                data: category
            });
            
        } catch (err) {
            res.status(500).json({
                message: `😖 Error fetching categorie with id ${id}`,
                error: err.message
            });
        }
    }

    static async getOne (req, res) {
        const name = req.query;
        try {
            const category = await Category.findOne(name);
            
            if (!category) {
                return res.status(404).json({
                    message: `😓 No category found with the name ${name}`
                });
            }
            
            res.status(200).json({
                message: '✅ Category fetched successfully',
                data: category
            });
            
        } catch (err) {
            res.status(500).json({
                message: `😖 Error fetching categorie with name ${name}`,
                error: err.message
            });
        }
    }

    static async Create(req, res) {

        try {
            const categoryId = await Category.Create(req.body);
            res.status(201).json({
                message: '✅ Category created successfully',
                categoryId: categoryId
            });
        } catch (err) {
            res.status(500).json({
                message: '😖 Error creating category',
                error: err.message
            });
        }
    }

    static async Update(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedRows = await Category.Update(id, data);
            if (updatedRows === 0) {
                return res.status(404).json({
                    message: `😓 Category with ID ${id} not found or no change`
                });
            }
            res.status(200).json({
                message: '✅ Category updated successfully',
                updatedRows: updatedRows
            });
            
        } catch (err) {
            res.status(500).json({
                message: '😖 Error updating category',
                error: err.message
            });
        }
    }

    static async Delete(req, res) {
        const { id } = req.params;
        try {
            const deletedRows = await Category.Delete(id);
            if (deletedRows === 0) {
                return res.status(404).json({
                    message: `😓 Category with ID ${id} not found`
                });
            }
            res.status(200).json({
                message: '✅ Category deleted successfully',
                deletedRows: deletedRows
            });
            
        } catch (err) {
            res.status(500).json({
                message: '😖 Error deleting category',
                error: err.message
            });
        }
    }

    static async getTotal(req, res) {
        try {
            const totalCategories = await Category.Count();
            res.status(200).json({
                message: '✅ Total categories fetched successfully',
                total: totalCategories
            });
            
        } catch (err) {
            res.status(500).json({
                message: '😖 Error fetching total categories',
                error: err.message
            });
        }
    }

}

export default Categorys;