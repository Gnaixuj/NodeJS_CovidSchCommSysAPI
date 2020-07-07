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

        res.status(204);
        res.send('Success');
    } catch (err) {
        console.log(err);
        res.status(400);
        res.send('Error');
    }
}

// RETRIEVE A LIST OF STUDENTS COMMON TO A GIVEN LIST OF TEACHERS
const commonstudents = async (req, res) => {
    try {
        var teachers;
        if (typeof req.query.teacher == 'object') {
            teachers = req.query.teacher;
        }
        else {
            teachers = [req.query.teacher];
        }
        if (teachers[0] == null || teachers[0].length < 1) {
            throw new Error('No Teacher(s) Email is Entered');
        }
        
        var results = [];
    
        for (var i = 0; i < teachers.length; i++) {
            var temp = [];
            var data = await Teacher.findOne({ teacher: teachers[i] });
            if (!data) {
                throw new Error(`${teachers[i]} Does Not Exists in Our Records`);
            }
            data.students.forEach((student) => {
                temp.push(student);
            });
            if (i === 0) {
                results = temp;
            }
            else {
                results = results.filter((n) => temp.indexOf(n) > - 1);
            }
        }

        res.status(200);
        res.json({ students: results });
    } catch (err) {
        res.status(400);
        res.send(err.message);
    }
}

// SUSPEND A SPECIFIED STUDENT
const suspend = async (req, res) => {
    try {
        const student = req.body.student;
        if (student == null || student.length < 1) {
            throw new Error('No Student Email is Entered');
        }
        const suspend = new Suspend(req.body);
        const data = await Suspend.findOne(req.body);
        if (data) {
            throw new Error(`${student} Already Suspended.`);
        }
        await suspend.save();

        res.status(204);
        res.send('Success');
    } catch (err) {
        res.status(400);
        res.send(err.message);
    }
}

// RETRIEVE A LIST OF STUDENTS WHO CAN RECEIVE A GIVEN NOTIFICATION
const retrievefornotifications = async (req, res) => {
    try {
        const teacher = req.body.teacher;
        const notif = req.body.notification;
        if (teacher == null || teacher.length < 1) {
            throw new Error('No Teacher Email is Entered');
        }
        var students= [];

        const data = await Teacher.findOne({ teacher });
        if (!data) {
            throw new Error(`${teacher} Does Not Exists in Our Records`);
        }
        data.students.forEach((student) => {
            students.push(student);
        });

        let startIndex = 0;
        let endIndex = 0;
        while (notif.indexOf('@', startIndex) != -1) {
            startIndex = notif.indexOf('@', startIndex);
            endIndex = notif.indexOf(' ', startIndex);
            if (endIndex == -1) {endIndex = notif.length;}
            students.push(notif.slice(startIndex + 1, endIndex));
            startIndex = endIndex + 1;
        }

        students = [...new Set(students)];

        var suspended;
        for (let i = 0; i < students.length; i++) {
            suspended = await Suspend.findOne({ student: students[i] });
            if (suspended) {
                students.splice(i, 1);
                i--;
            }
        }

        res.status(200);
        res.json({ recipents: students });
    } catch (err) {
        res.status(400);
        res.send(err.message);
    }
}

module.exports = { register, commonstudents, suspend, retrievefornotifications };