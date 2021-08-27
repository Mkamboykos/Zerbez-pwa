module.exports = (sequelize, DataTypes) => {

    const Manager = sequelize.define("Manager", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        restaurant_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        restaurant_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        restaurant_city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        restaurant_state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        restaurant_zip: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        role:{
            type: DataTypes.STRING,
            defaultValue: 'Manager'
        }
    },{
        timestamps: false
    })

    // Manager.sync({alert: true}).then(() => {
    //     console.log("\n\nManager table and model synced successfully!\n\n");
    // })

    return Manager
}   