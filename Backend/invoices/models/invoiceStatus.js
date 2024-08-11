const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/db');

const PerformaInvoiceStatus = sequelize.define('performaInvoiceStatus',{
    performaInvoiceId : {type : DataTypes.INTEGER, allowNull : false},
    status : {type : DataTypes.STRING},
    date : {type : DataTypes.DATE}
},
{
    freezeTableName: true,
    timestamps : false
})

module.exports = PerformaInvoiceStatus;


