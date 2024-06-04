const { Product, BasketProduct, Basket } = require("../models/models")

class BasketController {

    async addToBasket(req, res, next) {
        const user = req.user;
        const { productId, quantity } = req.body;
        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }
    
        // Поиск корзины пользователя
        const basket = await Basket.findOne({ where: { userId: user.id } });
    
        // Проверка наличия товара в корзине
        const existingProduct = await BasketProduct.findOne({ where: { basketId: basket.id, productId: productId } });
    
        if (existingProduct) {
            // Товар уже есть в корзине, обновляем количество
            existingProduct.quantity += quantity;
            await existingProduct.save();
        } else {
            // Товара нет в корзине, добавляем новый
            await BasketProduct.create({ basketId: basket.id, productId: productId, quantity: quantity });
        }
    
        return res.json({ message: "Product added to basket" });
    }
    
    async getBasketUser(req, res) {
        const { id } = req.user;
        const basket = await BasketProduct.findAll({
            include: {
                model: Product
            },
            where: { basketId: id }
        });
    
        if (!basket) res.status(400).json('None Id');
        return res.json(basket);
    }
    
    async deleteBasket(req, res) {
        const { id } = req.body;
        if (!id) res.status(400).json('None Id');
        await BasketProduct.destroy({ where: { id: id } });
        res.status(200).json('Product deleted');
    }    

    async updateQuantity (req, res)  {
        const { id, quantity } = req.body;
        console.log(`Получен ID: ${id}, Количество: ${quantity}`); // Логирование полученных данных
    
        if (quantity < 1) {
            console.log('Количество должно быть не менее 1');
            return res.status(400).json({ message: "Количество должно быть не менее 1" });
        }
    
        try {
            const result = await BasketProduct.update({ quantity }, { where: { id } });
            console.log(`Результат обновления: ${result}`); // Логирование результата обновления
            if (result[0] === 0) {
                console.log('Строки не обновлены');
                return res.status(404).json({ message: "Элемент корзины не найден" });
            }
            return res.json({ message: "Количество успешно обновлено" });
        } catch (e) {
            console.error(`Не удалось обновить количество: ${e.message}`); // Логирование ошибки
            return res.status(500).json({ message: "Не удалось обновить количество" });
        }
    };    

}

module.exports = new BasketController()
