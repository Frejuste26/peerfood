import { Router } from 'express';
import Payments from "../Controllers/Payment.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";
import Security from "../Middlewares/RoleMiddleware.js";

const Payment = Router();

Payment
    .get(
        '/',
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Payments.getAll
    )
    .get(
        '/:id',
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Payments.getById
    )
    .get(
        '/total',
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Payments.getTotal
    )
    .post(
        '/',
        AuthMiddleware.handle,
        Security.Restricted('administrator', 'student', 'teacher'),
        Payments.Create
    )
    .put(
        '/:id',
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Payments.Update
    )
    .delete(
        '/:id',
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Payments.Delete
    )

export default Payment;