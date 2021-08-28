module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        timestamps: false
    })

    // User.associate = (models) => {
    //     User.belongsTo(models.Admin, {
    //         foreignKey: {
    //             allowNull: true
    //         }
    //     })
    
    //     User.belongsTo(models.Manager, {
    //         foreignKey: {
    //             allowNull: true
    //         }
    //     })
    // }


    return User
}