const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
    current: String,
    machineid: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Device', DeviceSchema);