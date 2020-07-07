const express = require('express');
const app = express();
const db = require('./db');

const teacherRoutes = require('./routes/teacherRoutes');

app.use('/api', teacherRoutes);

module.exports = app;