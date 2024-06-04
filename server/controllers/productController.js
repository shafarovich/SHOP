const uuid = require('uuid')
const path = require('path')
const { Product, ProductInfo, User } = require('../models/models')
const ApiError = require('../error/ApiError')


class ProductController {
    async create(req, res, next) {
        try {
            let { name, price, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({ name, price, typeId, img: fileName })

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async setDescription(req, res, next) {
        try {
            let {_id,text} = req.body
           const product = await Product.update(
                {_info: text},
                {where: {id: _id}}
            );
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;
            products = await Product.findAndCountAll({
                where: typeId ? { isHidden: false, typeId } : { isHidden: false },
                limit,
                offset
            });
        return res.json(products)
    }

    async getAllAdmin(req, res) {
        let {typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;
            products = await Product.findAndCountAll({
                where: typeId ? { typeId } : null,
                limit,
                offset
            });
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}]
            },
        )
        return res.json(product)
    }
    
    async delOne(req, res) {
        const { id } = req.params;
        await Product.destroy({ where: { id: id } });
        return res.json({ message: 'Product deleted successfully' });
    }

    async getByType(req, res, next) {
        try {
            const { typeId } = req.params;
            const products = await Product.findAll({
                where: { typeId },
            });
            return res.json(products);
        } catch (e) {
            next(ApiError.internal('Internal server error'));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            let { name, price, typeId, info } = req.body;
            const product = await Product.findByPk(id);
            if (!product) {
                return next(ApiError.notFound('Product not found'));
            }
    
            let fileName = product.img; 
            if (req.files && req.files.img) {
                const { img } = req.files;
                fileName = uuid.v4() + ".jpg";
                img.mv(path.resolve(__dirname, '..', 'static', fileName));
            }
    
            await product.update({ name, price, typeId, img: fileName });
            await ProductInfo.destroy({ where: { productId: product.id } });
            if (info) {
                info = JSON.parse(info);
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                );
            }
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    
    async hideProduct(req, res) {
        try {
            const { id } = req.params;
            await Product.update({ isHidden: true }, { where: { id } });
            return res.status(200).json({ message: 'Product hidden successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to hide product' });
        }
    }

    async unhideProduct(req, res) {
        try {
            const { id } = req.params;
            await Product.update({ isHidden: false }, { where: { id } });
            return res.status(200).json({ message: 'Product unhidden successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to unhide product' });
        }
    }
    
    
}

module.exports = new ProductController()