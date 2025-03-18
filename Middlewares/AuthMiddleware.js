import jwt from 'jsonwebtoken';

class AuthMiddleware {
    static handle(req, res, next) {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.redirect('/admin/login')
        }

        const token = authorizationHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: `😓 Token missing from authorization header`,
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: `😖 Invalid or expired token`,
                });
            }

            req.user = decoded;
            next();
        });
    }
}

export default AuthMiddleware;
