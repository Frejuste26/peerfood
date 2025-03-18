import { Router } from 'express';
import Suppliers from  '../Controllers/Supplier.js'

const Supplier = Router();

Supplier
    .get(
        '/all',
        Suppliers.getAll
    )
    .get(
        '/findById/:id',
        Suppliers.getById
    )
    .get(
        '/findByName/:name',
        Suppliers.findOne
    )
    .get(
        '/total',
        Suppliers.getTotal
    )
    .post(
        '/add',
        Suppliers.Create
    )
    .put(
        '/update/:id',
        Suppliers.Update
    )
    .delete(
        '/delete/:id',
        Suppliers.Delete
    );

export default Supplier;