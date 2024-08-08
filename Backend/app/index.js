const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
const sequelize = require('../utils/db');
const path = require('path');

dotenv.config();
app.use(cors({orgin:'*'}))
app.use(express.json());

const syncModel = require('../utils/association')
syncModel()

const role = require('../users/routers/role');
const user = require('../users/routers/user');
const auth = require('../users/routers/auth');
app.use('/role', role);
app.use('/user', user);
app.use('/auth', auth);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})