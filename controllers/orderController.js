const router = require('express').Router();
const { models } = require('../model');
let validateJWT = require('../middleware/validate-session')


//! Creating an order log
router.post("/order", validateJWT, async (req, res) => {
if (req.user.role==='admin') {
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
} else {
    console.log('You do not have authority here')
}
  });

  //! Get all order logs
  router.get('/order', async (req, res) => {
      if (req.user.id==='admin') {
    try {
        const allOrders = await models.OrderModel.findAll()
  
        res.status(200).json(allOrders)
  
    } catch (err) {
  
        res.status(500).json({
            error: err,
            message: "The server broke but the app is still running"
        });
    }
} else {
    console.log('You do not have authority here')
}
  });

  //! Get all order logs by isEvent
  router.get('/event', async (req, res) => {
      if (req.user.role==='admin') {
    try {
        const results = await models.OrderModel.findAll({
            where: { isEvent: true }
        });
        res.status(200).json(results);
    }  catch (err) {
        res.status(500).json({ error: err });
    }
} else {
    console.log('You do not have authority here')
}
});

//! Get order by eventName 
router.get('/:eventName', async (req, res) => {
    if (req.user.role==='admin') {
    const  { eventName } = req.params;
    try {
        const results = await models.OrderModel.findAll({
            where: { eventName: eventName, isEvent: true }
        });
        res.status(200).json(results);
    }  catch (err) {
        res.status(500).json({ error: err });
    }
} else {
    console.log('You do not have authority here')
}
});

//! Update order by ID:
router.put('/:id', validateJWT, async (req, res) => {
    if (req.user.role==='admin') {
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
} else {
    console.log('You do not have authority here')
}
});

//! Delete order log by ID:
router.delete("/:id", validateJWT, async (req,res) => {
    if (req.user.role==='admin') {
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
} else {
    console.log('You do not have authority here')
}
})



module.exports = router;