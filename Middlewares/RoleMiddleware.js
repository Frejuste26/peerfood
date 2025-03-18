class Security {
    /**
     * Middleware to restrict access to specific roles.
     * @param {...string} roles - The roles allowed to access the route.
     * @returns {Function} Middleware function.
     */
    static Restricted(...roles) {
        return (req, res, next) => {
            // Vérifie si l'utilisateur est authentifié et son rôle autorisé
            if (!req.user) {
                return res.status(401).json({
                    message: '⚠️ Authentication required. Please log in.',
                });
            }

            if (!roles.includes(req.user.type)) {
                return res.status(403).json({
                    message: '🚫 Access denied. Insufficient permissions.',
                    requiredRoles: roles, // Indique les rôles nécessaires
                    userRole: req.user.type, // Fournit le rôle actuel de l'utilisateur pour le débogage
                });
            }

            next(); // Passe au middleware suivant ou au contrôleur
        };
    }
}

export default Security;
