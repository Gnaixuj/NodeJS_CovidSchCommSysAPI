const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Suspend = require('../models/suspend');
const db = require('../db');

// REGISTER 1 OR MORE STUDENTS TO A SPECIFIED TEACHER
const register = async (req, res) => {
    const teacher = new Teacher(req.body);
    try {
        const data = await Teacher.findOne({ teacher: req.body.teacher });
        if (!data) {
            await teacher.save();
        }
        else {
            req.body.students.forEach(element => {
                data.students.push(element);
            });
            data.students = [...new Set(data.students)];
            await data.save();
        }
        res.status(204).send('Success');
    } catch (err) {
        console.log(err);
        res.status(400).send('Error');
    }
}

// RETRIEVE A LIST OF STUDENTS COMMON TO A GIVEN LIST OF TEACHERS
const commonstudents = async (req, res) => {
    var teachers;
    if (typeof req.query.teacher == 'object') {
        teachers = req.query.teacher;
    }
    else {
        teachers = [req.query.teacher];
    }
    var results = [];
    try {
        for (var i = 0; i < teachers.length; i++) {
            var temp = [];
            var data = await Teacher.findOne({ teacher: teachers[i] });
            if (data) {
                data.students.forEach((student) => {
                    temp.push(student);
                })
                if (i === 0) {
                    results = temp;
                }
                else {
                    results = results.filter((n) => temp.indexOf(n) > - 1);
                }
            }
        }
        res.status(200);
        res.json({ students: results });
    } catch (err) {
        console.log(err);
        res.status(404);
        res.send('Error');
    }
}

// SUSPEND A SPECIFIED STUDENT
const suspend = async (req, res) => {
    try {
        if (req.body.student.length < 1) {
            throw new Error('No Student Email is Entered');
        }
        const suspend = new Suspend(req.body);
        const data = await Suspend.findOne(req.body);
        if (data) {
            throw new Error(`${req.body.student} Already Suspended`);
        }
        await suspend.save();
        res.status(200);
        res.send('Success');
    } catch (err) {
        res.status(400);
        res.send(err.message);
    }
}

module.exports = { register, commonstudents, suspend };