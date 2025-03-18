import { Router } from 'express';
import Categorys from "../Controllers/Category.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";
import Security from "../Middlewares/RoleMiddleware.js";

const Category = Router();

Category
    .get(
        "/",
        Categorys.getAll
    )
    .get(
        "/:id",
        Categorys.getById
    )
    .get(
        "/:name",
        Categorys.getOne
    )
    .post(
        "/",
        Categorys.Create
    )
    .put(
        "/:id",
        Categorys.Update
    )
    .delete(
        "/:id",
        Categorys.Delete
    )
    .get(
        "/total",
        Categorys.getTotal
    );

export default Category;