const Role = require("../users/models/role");
const sequelize = require('./db');

async function syncModel() {
    await sequelize.sync({alter: true})

    const roleData = [
        {roleName: 'Initiator Sales Person'},
        {roleName: 'Key Account Manager'},
        {roleName: 'Authorizer Manager'},
        {roleName: 'Maker Accountant'}
    ]
    const role = await Role.findAll({});
    if(role.length === 0){
        for(let i = 0; i < roleData.length; i++){
            Role.bulkCreate([roleData[i]]);
        }
    }
}

module.exports = syncModel;