module.exports = (app) => {
    const devices = require('../controllers/device.controller.js');

    // Create a new Device
    app.post('/devices', devices.create);

    // Retrieve all devices
    app.get('/devices', devices.findAll);

    // Retrieve a single Device with deviceId
    app.get('/devices/:deviceId', devices.findOne);

    // Update a Device with deviceId
    app.put('/devices/:deviceId', devices.update);

    // Delete a Device with deviceId
    app.delete('/devices/:deviceId', devices.delete);
}