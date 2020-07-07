const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    teacher: {
        type: String,
        required: true
    },
    students: {
        type: Array,
        required: true,
        default: []
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;