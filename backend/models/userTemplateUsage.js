const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Template = require('./template'); // Import Template model

const UserTemplateUsage = sequelize.define('UserTemplateUsage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   model: 'users', // Assumes a 'users' table exists
    //   key: 'id',
    // },
  },
  template_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Template, // Reference the Template model
      key: 'id',
    },
  },
  used_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'user_template_usage',
  timestamps: false, // Disable Sequelize's default timestamps
});

// Define associations
UserTemplateUsage.belongsTo(Template, { foreignKey: 'template_id' });
Template.hasMany(UserTemplateUsage, { foreignKey: 'template_id' });

module.exports = UserTemplateUsage;