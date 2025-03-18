import mysql from 'mysql2';

class Database {
  constructor() {
    this.connection = null;
  }

    // Méthode pour établir la connexion à la base de données
     Start() {
        if (Database.connection) {
            return '✅ Already connected to the database';  // Retourne si la connexion est déjà établie
        }

        return new Promise((resolve, reject) => {
            Database.connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'cantinescolaire'
            });

            Database.connection.connect((err) => {
                if (err) {
                    reject(`❌ Database connection failed: ${err.stack}`);
                } else {
                    resolve('✅ Connected to the database');
                }
            });
        });
    }

    // Méthode pour exécuter une requête SQL
   query(sql, params = []) {
        if (!Database.connection) {
            throw new Error('❌ No database connection established.');
        }

        return new Promise((resolve, reject) => {
            Database.connection.query(sql, params, (err, results) => {
                if (err) {
                    reject(`❌ Request Failed: ${err.message}`);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Méthode pour fermer la connexion à la base de données
    async close() {
        if (!Database.connection) {
            throw new Error('❌ No active database connection to close.');
        }

        return new Promise((resolve, reject) => {
            Database.connection.end((err) => {
                if (err) {
                    reject(`😖 Error closing connection: ${err.message}`);
                } else {
                    resolve('🌟 Closed connection');
                }
            });
        });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
 
}

export default Database;
