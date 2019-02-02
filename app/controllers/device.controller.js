const Device = require('../models/device.model.js');

// Create and Save a new Device
exports.create = (req, res) => {

// Validate request
    if(!req.body.machineid) {
        return res.status(400).send({
            message: "Device machineid can not be empty"
        });
    }

    // Create a Device
    const device = new Device({
        current: req.body.current || "Untitled Device", 
        machineid: req.body.machineid
    });

    // Save Device in the database
    device.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Device."
        });
    });



};

// Retrieve and return all devices from the database.
exports.findAll = (req, res) => {

    Device.find()
    .then(devices => {
        res.send(devices);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving devices."
        });
    });


};

// Find a single device with a deviceId
exports.findOne = (req, res) => {

    Device.findById(req.params.deviceId)
        .then(device => {
            if (!device) {
            return res.status(404).send({
                message: "Device not found with id " + req.params.deviceId
            });            
        }
            res.send(device);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Device not found with id " + req.params.deviceId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving device with id " + req.params.deviceId
        });
    });

};

// Update a device identified by the deviceId in the request
exports.update = (req, res) => {


	// Validate Request
    if(!req.body.machineid) {
        return res.status(400).send({
            message: "Device machineid can not be empty"
        });
    }

    // Find device and update it with the request body
    Device.findByIdAndUpdate(req.params.deviceId, {
        current: req.body.current || "Untitled Device",
        machineid: req.body.machineid
    }, {new: true})
        .then(device => {
            if (!device) {
            return res.status(404).send({
                message: "Device not found with id " + req.params.deviceId
            });
        }
            res.send(device);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Device not found with id " + req.params.deviceId
            });                
        }
        return res.status(500).send({
            message: "Error updating device with id " + req.params.deviceId
        });
    });

};

// Delete a device with the specified deviceId in the request
exports.delete = (req, res) => {


    Device.findByIdAndRemove(req.params.deviceId)
        .then(device => {
            if (!device) {
            return res.status(404).send({
                message: "Device not found with id " + req.params.deviceId
            });
        }
        res.send({ message: "Device deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Device not found with id " + req.params.deviceId
            });                
        }
        return res.status(500).send({
            message: "Could not delete device with id " + req.params.deviceId
        });
    });

};
