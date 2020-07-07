const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const suspendSchema = new Schema({
    student: {
        type: String,
        required: true
    }
})

const Suspend = mongoose.model('Suspend', suspendSchema);

module.exports = Suspend;  