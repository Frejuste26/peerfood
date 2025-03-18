import { Router } from "express";
import Supplier from "../Models/Supplier.js";
import Plat from "../Models/Plat.js";
import Category from "../Models/Category.js";
import Authentication from "../Controllers/Authentication.js";

const Routers = Router();

Routers
    .get("/",
        (req, res) => {
        res.render("home", { title: "Home" });
    })
    
    .get("/admin/login", (req, res) => {
        res.render("login", { title: "Connexion"});
    })

    .post("/admin/login", Authentication.Login)

    .get("/statistics", (req, res) => {
        res.render("statistics", { title: "Statistique" });
    })

    .get("/Customers", (req, res) => {
        res.render("clients", { title: "Clients" });
    })

    .get("/Orders", (req, res) => {
        res.render("commandes", { title: "Commandes" });
    })

    // ✅ Récupération des fournisseurs depuis la BDD
    .get("/Suppliers", async (req, res) => {
        try {
            const suppliers = await Supplier.findAll();
            res.render("fournisseur", { 
                title: "Gestion des Fournisseurs",
                suppliers
            });
        } catch (error) {
            console.error("❌ Erreur lors de la récupération des fournisseurs :", error);
            res.status(500).send("Erreur interne");
        }
    })

    // ✅ Récupération du menu (plats & catégories)
    .get("/Menus", async (req, res) => {
        try {
            const categories = await Category.findAll();
            const meals = await Plat.findAll();
            res.render("menu", { 
                title: "Gestion du Menu",
                categories,
                meals
            });
        } catch (error) {
            console.error("❌ Erreur lors du chargement du menu :", error);
            res.status(500).send("Erreur interne");
        }
    })

    // ✅ Correction du chargement dynamique des pages du menu
    .get("/Menus/:page", (req, res) => {
        const { page } = req.params;
        res.render(`Menus/${page}`, (err, html) => {
            if (err) {
                console.error(`❌ Erreur de chargement de ${page}.ejs :`, err);
                return res.status(404).send("Page introuvable");
            }
            res.send(html);
        });
    })

    // ✅ Ajout d'un fournisseur
    .post("/Suppliers/addnew", async (req, res) => {
        try {
            await Supplier.Create(req.body);
            res.redirect("/Suppliers");
        } catch (error) {
            console.error("❌ Erreur lors de l'ajout du fournisseur :", error);
            res.status(500).send("Erreur interne");
        }
    })

    // ✅ Suppression d'un fournisseur
    .delete("/Suppliers/delete/:id", async (req, res) => {
        try {
            await Supplier.Delete(req.params.id);
            res.redirect("/Suppliers");
        } catch (error) {
            console.error("❌ Erreur lors de la suppression du fournisseur :", error);
            res.status(500).send("Erreur interne");
        }
    });

export default Routers;
