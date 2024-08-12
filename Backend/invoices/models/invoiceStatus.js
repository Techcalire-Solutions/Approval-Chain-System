const { DataTypes } = require('sequelize');
const sequelize = require('../../utils/db');
const PerformaInvoice = require('./performaInvoice');

const PerformaInvoiceStatus = sequelize.define('performaInvoiceStatus',{
    performaInvoiceId : {type : DataTypes.INTEGER, allowNull : false},
    status : {type : DataTypes.STRING},
    date : {type : DataTypes.DATE},
    remarks : {type : DataTypes.STRING}
},
{
    freezeTableName: true,
    timestamps : false
})

PerformaInvoice.hasMany(PerformaInvoiceStatus, {foreignKey : 'performaInvoiceId'})
PerformaInvoiceStatus.belongsTo(PerformaInvoice);

module.exports = PerformaInvoiceStatus;


