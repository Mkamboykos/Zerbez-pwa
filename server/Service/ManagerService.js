const {Manager} = require('../models');

const findByUsername = async (username) => {
    const user = Manager.findOne({ where: {username: username} });
    return user;
}

const findByEmail = async (email) => {
    const user = await Manager.findOne({ where: {email: email} });
    return user;
}
  
module.exports = {
    findByUsername,
    findByEmail
}