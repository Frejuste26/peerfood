import { Router } from "express";
import Customers from "../Controllers/Customer.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";
import Security from "../Middlewares/RoleMiddleware.js";

const Customer = Router();

// ✅ Appliquer `AuthMiddleware.handle` sur toutes les routes

// ✅ API endpoints 
Customer
    // Get all clients (avec filtre par statut)
    .get("/", Customers.getAll)

    // Get a single client by ID
    .get("/findById/:id", Customers.getById)

    // Get total number of clients
    .get("/total", Customers.getTotal)

    // Search client by lastname and firstname (Admin only)
    .get(
        "/search",
        Customers.getOne
    )

    // Create a new client (Admin only)
    .post(
        "/add", 
        Customers.Create
    )

    // Update a client by ID (Admin only)
    .put(
        "/update/:id",
        Customers.Update
    )

    // Delete a client by ID (Admin only)
    .delete(
        "/delete/:id",
        Customers.Delete
    );

export default Customer;
