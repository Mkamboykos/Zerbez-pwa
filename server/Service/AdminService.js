const {Admin} = require('../models');

const findByUsername = async (username) => {
    const user = await Admin.findOne({ where: {username: username} });
    return user;
}

const findByEmail = async (email) => {
    const user = await Admin.findOne({ where: {email: email} });
    return user;
}
  
module.exports = {
    findByUsername,
    findByEmail
}