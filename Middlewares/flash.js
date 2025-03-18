function flash(req, res, next) {
    res.locals.flash = req.session.flash || {};
    req.session.flash = {};
    req.flash = function(type, message) {
        if (!req.session.flash[type]) {
            req.session.flash[type] = [];
        }
        req.session.flash[type].push(message);
    };
    next();
}

export default flash;