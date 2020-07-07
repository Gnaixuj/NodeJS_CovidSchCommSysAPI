const Teacher = require('../models/teacher');
const Student = require('../models/student');
const db = require('../db');

// REGISTER 1 OR MORE STUDENTS TO A SPECIFIED TEACHER
// const register = (req, res) => {
//     const teacher = new Teacher(req.body);
//     Teacher.findOne({teacher: req.body.teacher})
//         .then((data) => {
//             if (!data) {
//                 teacher.save()
//             }
//             else {
//                 req.body.students.forEach(element => {
//                     data.students.push(element);
//                 });
//                 data.students = [...new Set(data.students)];
//                 data.save()
//             }
//         })
//         .then(() => {
//             res.status(204).send('Success');
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(400).send('Error');
//         })
// };

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

module.exports = { register, commonstudents };