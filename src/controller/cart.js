const cart = require('../models/cart');
const Cart = require('../models/cart');



exports.addItemToCart = (req, res) => {

    Cart.findOne({ user: req.user._id })
        .exec((error, cart) => {

            if (error) return res.status(400).json({ error });
            if (cart) {
                //updating the cart
                const product = req.body.cartItems.product;
                const item = cart.cartItems.find(c => c.product == product);
                let condition, update;

                if (item) {
                    condition = { user: req.user._id, "cartItems.product": product };
                    update = {
                        "$set": {
                            "cartItems.$": {
                                ...req.body.cartItems,
                                quantity: item.quantity + req.body.cartItems.quantity,
                                price: item.price + req.body.cartItems.price
                            }
                        }
                    };
                    

                } else {
                    condition = { user: req.user._id };
                    update = {
                        "$push": {
                            "cartItems": req.body.cartItems
                        }
                    };
                }
                Cart.findOneAndUpdate(condition,update)

                    .exec((error, _cart) => {
                        if (error) return res.status(400).json({ error });
                        if (_cart) {
                            return res.status(201).json({ cart: _cart });
                        }
                    });

            } else {
                //new cart create
                const cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
                });

                cart.save((error, cart) => {
                    if (error) return res.status(400).json({ error });
                    if (cart) {
                        return res.status(201).json({ cart });
                    }
                });

            }
        });


};