const { Order, OrderProduct, BasketProduct, Product} = require("../models/models")
const { Sequelize } = require('../db');

class OrderController {
    async addOrder(req, res, next) {
        let newOrder = {
            userId: req.body.id,
            phone: req.body.phone,
            address: req.body.address
        };

        const basket = await BasketProduct.findAll({ where: { basketId: req.body.id } });

        if (basket.length >= 1) {
            const order = await Order.create(newOrder);

            // Сохранение товаров из корзины в таблицу order_products
            for (const item of basket) {
                await OrderProduct.create({
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity  // Добавляем количество товара
                });
            }

            await BasketProduct.destroy({ where: { basketId: req.body.id } });

            res.status(201).json(order);
        } else {
            res.status(404).json({ message: "Корзина пуста" });
        }
    }

    async getAll(req,res) {
        const order = await Order.findAll()
        return res.json(order)
    }

    async getUserOrder(req,res){
        const {id} = req.params
        const date = await Order.findAll({where: {userId: id}} )
          // delete the dot and everything after
        return res.json(date)
    }

    async getUserOrderList(req,res){
        const {id} = req.params
        const date = await Order.findOne( {where: {id: id}})
        const a =  await OrderProduct.findAll({include: {
                model: Product
            }, where: {orderId: id}});
        return res.json(a)
    }

    async updateUserOrder(req, res) {
        const { id } = req.params;
        const { status } = req.body;

        try {
            const order = await Order.findByPk(id);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            await order.update({ status });
            return res.json(order);
        } catch (error) {
            console.error("Failed to update order status:", error);
            return res.status(500).json({ message: "Failed to update order status" });
        }
    }

}

module.exports = new OrderController()
