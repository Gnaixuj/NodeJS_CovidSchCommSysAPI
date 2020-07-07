const Teacher = require('../models/teacher');
const Student = require('../models/student');
const db = require('../db');

// REGISTER 1 OR MORE STUDENTS TO A SPECIFIED TEACHER
const register = (req, res) => {
    const teacher = new Teacher(req.body);
    Teacher.findOne({teacher: req.body.teacher})
        .then((data) => {
            if (!data) {
                teacher.save()
            }
            else {
                req.body.students.forEach(element => {
                    data.students.push(element);
                });
                data.students = [...new Set(data.students)];
                data.save()
            }
        })
        .then(() => {
            res.status(204).send('Success');
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send('Error');
        })
};

module.exports = { register };