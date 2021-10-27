const {Manager} = require('../models');

const findByUsername = async (username) => {
    await Manager.findOne({ where: {username: username} });
}

const findByEmail = async (email) => {
    await Manager.findOne({ where: {email: email} });
}
  
module.exports = {
    findByUsername,
    findByEmail
}