const accounts = require('./account.schema')

const createUser = async (data) => {
    try {
        const newUser = await accounts.create(data)
        return newUser
    } catch (error) {
        throw error
    }
}

const getExistUser = async (userName) => {
    try {
        const userFinds = await accounts.findOne({ user_name: userName })
        return userFinds;
    } catch (error) {
        throw error
    }
}

const update = async (id, update) => {
    try {
        const newUpdate = await accounts.findByIdAndUpdate(id, update)
        return newUpdate;
    } catch (error) {
        throw error
    }
}

module.exports = {
    createUser,
    update,
    getExistUser
}