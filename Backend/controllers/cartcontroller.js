import usermodel from "../models/usermodel.js";
import axios from 'axios'
const addtocart = async (req, res) => {

    try {
        let userdata = await usermodel.findById(req.body.userid);
        let cartdata = await userdata.cartdata;

        if (!cartdata[req.body.itemid]) {
            cartdata[req.body.id] = 1;
        } else {
            cartdata[req.body.id] += 1;
        }

        await usermodel.findByIdAndUpdate(req.body.userid, { $set: { cartdata } });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};

const removefromcart = async (req, res) => {
    console.log('Request to /api/cart/remove received:', req.body); // Log the request body
    try {
        const userdata = await usermodel.findById(req.body.userid);
        let cartdata = await userdata.cartdata;

        if (cartdata[req.body.id] > 0) {
            cartdata[req.body.id] -= 1;
        }

        await usermodel.findByIdAndUpdate(req.body.userid, { $set: { cartdata } });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const getcartdata = async (req, res) => {
     console.log('Request to /api/cart/get received:', req.body); // Log the request body
    try {
        const userdata = await usermodel.findById(req.body.userid);
        let cartdata = await userdata.cartdata;
        res.json({ success: true, cartdata });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};

export { addtocart, removefromcart, getcartdata };
