module.exports = (sequelize, DataTypes) => {

    const Admin = sequelize.define("Admin", {
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
            allowNull: false,
        },
        role:{
            type: DataTypes.STRING,
            defaultValue: 'Admin'
        }
    },{
        timestamps: false
    })

    // Admin.sync({alter:true}).then(() => {

    //     Admin.bulkCreate([
    //         {
    //             username: 'Admin',
    //             email: 'manuel.kamboykos@gmail.com',
    //             password: 'password123',
    //         }
    //     ])

    //     console.log("\n\n Admin table and model synced successfully!\n\n");
    // })

    return Admin
}