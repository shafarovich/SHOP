const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define ( 'user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define ( 'basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketProduct = sequelize.define ( 'basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 }},
})

const Product = sequelize.define ( 'product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    isHidden: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false},
})

const Type = sequelize.define ( 'type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const ProductInfo = sequelize.define ( 'product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const Order = sequelize.define ( 'order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.INTEGER,  defaultValue: 1},

})

const OrderProduct = sequelize.define ( 'order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
})

const Feedback = sequelize.define ( 'feedback', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    message: {type: DataTypes.STRING, allowNull: false, validate: {
        len: [0, 600] // ограничить длину сообщения до 600 символов
    }},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

OrderProduct.belongsTo(Product);
Product.hasMany(OrderProduct);

Product.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(Product)

Type.hasMany(Product)
Product.belongsTo(Type)

Product.hasMany(OrderProduct);
OrderProduct.belongsTo(Product);

module.exports = {
    User,
    Basket,
    BasketProduct,
    Product,
    Type,
    ProductInfo,
    Order,
    OrderProduct,
    Feedback
}

