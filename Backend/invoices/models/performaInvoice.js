const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/db');

const PerformaInvoice = sequelize.define('performaInvoice',{
    piNo : {type : DataTypes.STRING, allowNull : false},
    url : {type : DataTypes.STRING, defaultValue : true},
    bankSlip : {type : DataTypes.STRING},
    status: {type : DataTypes.STRING, defaultValue: 'Generated'},
},
{
    freezeTableName: true,
    timestamps : false
})

module.exports = PerformaInvoice;


