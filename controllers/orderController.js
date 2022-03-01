const router = require('express').Router();
const { models } = require('../models');
let validateJWT = require('../middleware/validate-session')


//! Creating an order log
router.post("/order", validateJWT, async (req, res) => {

    const { date, itemCount, desc, isEvent, eventName, cost } = req.body
    try {
        const createOrder = await models.OrderModel.create({
            date, 
            itemCount,
            desc,
            isEvent,
            eventName,
            cost
        });
  
        console.log(createOrder);
  
        res.status(201).json({
            message: 'Order Log successfully recorded',
            createOrder
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to post ${err.message}`
        })
    }
  });

  //! Get all order logs
  router.get('/order', async (req, res) => {
    try {
        const allOrders = await models.OrderModel.findAll()
  
        res.status(200).json(allOrders)
  
    } catch (err) {
  
        res.status(500).json({
            error: err,
            message: "The server broke but the app is still running"
        });
    }
  });

  //! Get all order logs by isEvent
  router.get('/event', async (req, res) => {
    try {
        const results = await models.OrderModel.findAll({
            where: { isEvent: true }
        });
        res.status(200).json(results);
    }  catch (err) {
        res.status(500).json({ error: err });
    }
});

//! Get order by eventName 
router.get('/:eventName', async (req, res) => {
    const  { eventName } = req.params;
    try {
        const results = await models.OrderModel.findAll({
            where: { eventName: eventName, isEvent: true }
        });
        res.status(200).json(results);
    }  catch (err) {
        res.status(500).json({ error: err });
    }
});

//! Update order by ID:
router.put('/:id', validateJWT, async (req, res) => {
    const {  
        date, 
        itemCount,
        desc,
        isEvent,
        eventName,
        cost } = req.body;
    const orderId = req.params.id;
    

    const query = {
        where: {
            id: orderId,
        }
    };

    const updatedOrder = {
        date, 
        itemCount,
        desc,
        isEvent,
        eventName,
        cost
    };

    try {
        const update = await models.OrderModel.update(updatedOrder, query);
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//! Delete order log by ID:
router.delete("/:id", validateJWT, async (req,res) => {
    const orderId = req.params.id;

    try {
        const query = {
            where: {
                id: orderId,
            }
        };

        await models.OrderModel.destroy(query);
        res.status(200).json({ message: "Order Log Removed"});
    } catch (err) {
        res.status(500).json({ error: err });
    }
})



module.exports = router;