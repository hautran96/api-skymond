const accountModel = require('../model/account.model')
const { rsErrorOperation, rsErrorExist, rsSuccess, rsErrorNotExist, rsError } = require('../helpers/response')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtHelper = require('../helpers/jwt')
const config = require('../../config/env')

const createUser = async (req, res) => {
    try {
        const userFind = await accountModel.getExistUser(req.body.userName)
        if (userFind) {
            return res.json(rsErrorExist("Account"))
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.passWord, salt);

        const newUser = {
            user_name: req.body.userName,
            pass_word: hash
        }

        const newAccount = await accountModel.createUser(newUser);
        if (newAccount) {
            return res.json(rsSuccess())
        }
    } catch (error) {
        return res.json(rsErrorOperation(error.message))
    }
}

const changePassword = async (req, res) => {
    try {

    } catch (error) {

    }
}

const login = async (req, res) => {
    try {
        const userFind = await accountModel.getExistUser(req.body.userName)
        if (userFind) {
            const dataAccess = {
                userName: userFind.user_name,
                create_by: userFind.create_by,
                create_date: userFind.create_date,
            }
            const check = bcrypt.compareSync(req.body.passWord, userFind.pass_word);
            if (check) {
                dataAccess.accessToken = await jwtHelper.generateToken(
                    dataAccess,
                    config.ACCESS_TOKEN_SECRET,
                    config.ACCESS_TOKEN_LIFE_MOBILE
                )

                return res.json(rsSuccess(dataAccess));
            }
            return res.json(rsError(412, "Sai tên đăng nhập hoặc mật khẩu"));
        }
        return res.json(rsErrorNotExist("Account"))
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    changePassword,
    login
}