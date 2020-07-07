const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    student: {
        type: String,
        required: true
    },
    suspended: {
        type: Boolean,
        required: true,
        default: false
    },
    teachers: {
        type: Array,
        required: true,
        default: []
    }
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;   