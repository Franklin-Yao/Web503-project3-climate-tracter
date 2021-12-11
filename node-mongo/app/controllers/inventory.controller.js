const moogoose = require('mongoose')
const Inventory = moogoose.model('ClimateEvent');

exports.createInventory = (req, res) => {
    const inventory = new Inventory({
        userid: req.body.userid,
        event_type: req.body.event_type,
        emergency_level: req.body.emergency_level,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        descriptions: req.body.descriptions,
        url: req.body.url
    });
    inventory.save().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
            message: "Fail!",
            error: err.message
        })
    })
}

exports.getInventory = (req, res) => {
    Inventory.findById(req.params.id).select('-__v')
        .then(inventory => {
            res.status(200).json(inventory)
        }).catch(err => {
            if (err.kind == 'ObjectId') {
                return res.status(404).send({
                    message: "Inventory not found with id " + req.params._id,
                    error: err
                });
            }
            return res.status(500).send({
                message: "Error retrieving Inventory with id " + req.params._id,
                error: err
            })
        })
}

exports.inventories = (req, res) => {
    Inventory.find().select('-__v').then(inventoryInfos => {
        res.status(200).json(inventoryInfos);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error!',
            error: err
        })
    })
} 

exports.myInventories = (req, res) => {
    Inventory.find({"userid": req.params.userid}).select('-__v')
        .then(inventory => {
            res.status(200).json(inventory)
        }).catch(err => {
            if (err.kind == 'ObjectId') {
                return res.status(404).send({
                    message: "Inventory not found with id " + req.params.userid,
                    error: err
                });
            }
            return res.status(500).send({
                message: "Error retrieving Inventory with id " + req.params.userid,
                error: err
            })
        })
}

exports.deleteInventory = (req, res) => {
    Inventory.findByIdAndRemove(req.params.id).select('-__v-_id')
        .then(inventory => {
            if (!inventory) {
                res.status(404).json({
                    message: "No inventory found with id = " + req.params._id,
                    error: "404"
                })
            }
            res.status(200).json({})
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Con't delete inventory with id = " + req.params._id,
                error: err.message
            })
        })
}

exports.updateInventory = (req, res) => {
    Inventory.findByIdAndUpdate(req.params._id, {
        userid: req.body.userid,
        event_type: req.body.event_type,
        emergency_level: req.body.emergency_level,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        descriptions: req.body.descriptions,
        url: req.body.url
    }, { new: false }).select('-__v')
        .then(inventory => {
            if (!inventory) {
                return res.status(404).send({
                    message: "Error -> Can't update an inventory with id = " + req.params._id,
                    error: "Not Found!"
                })
            }
            res.status(200).json(inventory);
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Can't update a inventory with id = " + req.params._id,
                error: err.message
            })
        })

}