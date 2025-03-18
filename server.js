import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import session from 'express-session';
import { errors } from 'celebrate';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url'; // Importer la fonction pour convertir l'URL
import cors from 'cors';
import morgan from 'morgan';
import Database from './Config/database.js';
// Router imported
import Routers from './Routers/index.js';
import Customer from './Routers/Customer.js';
import Account from './Routers/Account.js';
import Category from "./Routers/Category.js";
import Plat from "./Routers/Plat.js";
import Supplier from "./Routers/Supplier.js";
import Order from './Routers/Order.js';
import Payment from "./Routers/Payment.js";
import AuthRouter from "./Routers/Authentication.js";

// Charger les variables d'environnement
dotenv.config();

// Convertir l'URL du module en chemin absolu
const __filename = fileURLToPath(import.meta.url); // Obtenez le chemin du fichier
const __dirname = path.dirname(__filename); // Obtenez le répertoire du fichier

// Créer l'application Express
const app = express();
const port = process.env.APP_PORT || 8000;

// Configurer le middleware body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Configurer le middleware de session

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Définir le chemin des fichiers statiques
app.use(express.static(path.join(__dirname, 'src/Public'))); // Utilisation du bon chemin
app.use('/uploads', express.static('uploads'));

// Définir le moteur de vue
app.set('view engine', 'ejs');

// Charger les templates Marko dans le dossier des vues
app.set('views', path.join(__dirname, 'src'));

// Utilisation des routes
app.use('/', Routers);
app.use('/customer', Customer);
app.use('/account', Account);
app.use('/category', Category);
app.use('/meal', Plat);
app.use('/supplier', Supplier);
app.use('/order', Order);
app.use('/payment', Payment);
app.use('/auth', AuthRouter);

// Fonction pour démarrer le serveur
const LaunchApp = async () => {
    const db = Database.getInstance();

    try {
        const message = await db.Start();
        console.log(chalk.hex('#2980b9').bold(`${message}`));  // Message de succès avec couleur personnalisée et gras

        app.listen(port, () => {
            console.log(chalk.hex('#E67E22').bold('🟢 Server'), 
                        chalk.hex('#2c3e50').bold('is running on port'), 
                        chalk.hex('#27AE60').bold(`${port}`));  // Message de serveur avec fond bleu et texte blanc
        });
    } catch (error) {
        console.error(chalk.hex('#c0392b').bold(`🔴 ERROR: ${error.message}`));  // Message d'erreur avec fond rouge et texte blanc
    }
};

// Gestion des erreurs de validation de Celebrate
app.use(errors());

// Lancer le serveur
LaunchApp();
