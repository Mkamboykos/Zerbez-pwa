module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
      "role", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        // Options
        timestamps: false
      }
    );
  
    return Role;
  };