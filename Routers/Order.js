import { Router } from 'express';
import Orders from "../Controllers/Order.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";
import Security from "../Middlewares/RoleMiddleware.js";

const Order = Router();

Order
    .get(
        '/',
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Orders.getAll
    )
    .get(
        '/:id',
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Orders.getById
    )
    .get(
        '/total',
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Orders.getTotal
    )
    .post(
        '/',
        AuthMiddleware.handle,
        Security.Restricted('administrator', 'student', 'teacher'),
        Orders.Create
    )
    .put(
        '/:id',
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Orders.Update
    )
    .delete(
        '/:id',
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Orders.Delete
    )

export default Order;