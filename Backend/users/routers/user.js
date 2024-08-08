const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();
const authenticateToken = require('../../middleware/authorization');
const Role = require('../models/role')
const {Op, fn, col, where} = require('sequelize');
const sequelize = require('../../utils/db'); 

router.post('/add', async (req, res) => {
  console.log(req.body);
  const { name, email, phoneNumber, password, roleId, status} = req.body;
  try {
    try {
      const userExist = await User.findOne({
        where: { email: email}
      });
      if (userExist) {
        return res.send('User already exists' )  
      }
      console.log(userExist);
    } catch (error) {
      res.send(error.message)
    } 
    const pass = await bcrypt.hash(password, 10);
    
    const user = new User({name, email, phoneNumber, password: pass, roleId, status});
    await user.save();
    console.log(user);
    
    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
})

router.get('/find', async (req, res) => {
  try {
    const user = await User.findAll({})
    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = router;
 