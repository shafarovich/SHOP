const jwt = require('jsonwebtoken')

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try{
            const token = req.headers.authorization.split(' ')[1] 
            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }
            req.user = decoded
            next()
        }catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    
    };
}

const jwt = require('jsonwebtoken');

module.exports = function (role) {
    return function (req, res, next) {
        // Проверка, если метод запроса является OPTIONS
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            // Извлечение токена из заголовка авторизации
            const token = req.headers.authorization.split(' ')[1];            
            if (!token) {
                return res.status(401).json({ message: "Не авторизован" });
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);            
            // Проверка, совпадает ли роль пользователя с требуемой ролью
            if (decoded.role !== role) {
                return res.status(403).json({ message: "Нет доступа" });
            }
            req.user = decoded;            
            next();
        } catch (e) {
            res.status(401).json({ message: "Не авторизован" });
        }
    };
};


