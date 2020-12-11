const express = require("express");
const router = express.Router();
const knex = require("../../helper/knex");

const getOrderList = async (req, res) => {
    try {
        // get phone_number form body
        const phone_number = Number(req.body.phone_number);
        const q = req.params["q"];

        console.log(q);

        let orderList;

        if (q == "all") {
            orderList = await knex("order")
                .where("phone_number", phone_number)
                .select("*");
        } else if (q == "cancaled") {
            orderList = await knex("order")
                .where("phone_number", phone_number)
                .select("*")
                .where("status", "0");
        } else if (q == "delivered") {
            orderList = await knex("order")
                .where("phone_number", phone_number)
                .select("*")
                .where("status", "2");
        } else {
            return res.status(404).json({ error: 'NotFoundError: Not Found' })
        }

        if (orderList.length == 0) {
            return res.status(204).json({ error: 'you not have any order' })
        }

        return res.status(200).json(orderList);
    } catch (err) {
        return res.status(401).json({
            "error": {
                status: "0",
                message: `${err}`,
            },
        });
    }
};

router.get("/orderList/:q/", getOrderList);

module.exports = router;
