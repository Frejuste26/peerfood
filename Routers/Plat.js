import { Router } from "express";
import Meal from "../Controllers/Plat.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";
import Security from "../Middlewares/RoleMiddleware.js";

const Plat = Router();

Plat
    .get(
        "/",
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Meal.getAll
    )
    .get(
        "/:id",
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Meal.getById
    )
    .get(
        "/total",
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Meal.getTotal
    )
    .get(
        '/:name',
        AuthMiddleware.handle,
        Security.Restricted('administrator', 'student', 'teacher'),
        Meal.getOne
    )
    .post(
        "/",
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Meal.Create
    )
    .put(
        "/:id",
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Meal.Update
    )
    .delete(
        "/:id",
        AuthMiddleware.handle,
        Security.Restricted('administrator'),
        Meal.Delete
    )

export default Plat;