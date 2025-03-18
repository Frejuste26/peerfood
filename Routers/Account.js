import { Router } from "express";
import Accounts from "../Controllers/Account.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";
import Security from "../Middlewares/RoleMiddleware.js";

const Account = Router();

// API endpoints 
Account
    // Get all clients (Admin only)
    .get(
        "/",
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Accounts.getAll
    )

    // Get a single client by ID (Admin and Current user can access their own data)
    .get(
        "/:id",
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Accounts.getById
    )

    // Create a new client (Admin only)
    .post(
        "/",
        Accounts.Create
    )

    // Update a client by ID (Admin only)
    .put(
        "/:id",
        AuthMiddleware.handle,
        Security.Restricted('administrator', 'student', 'teacher'),
        Accounts.Update
    )

    // Delete a client by ID (Admin only)
    .delete(
        "/:id",
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Accounts.Delete
    )

    // Get the total number of clients (Admin only)
    .get(
        "/total",
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Accounts.getTotal
    )

    .put('/:id/enable',
        Accounts.EnableAccount
    )

    .put('/:id/disable',
        Accounts.DisableAccount
    )

    // Search client by lastname and firstname (Admin only)
    .get(
        "/search",
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Accounts.getOne
    );

export default Account;
