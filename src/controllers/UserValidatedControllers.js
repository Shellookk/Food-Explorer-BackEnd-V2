//importações
const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class UserValidatedControllers {
    //visualiza
    async index(request, response) {
        const { user } = request

        const userEmailExist = await knex("users").where({id: user.id})

        if(userEmailExist.length === 0) {
            throw new AppError("Unauthorized", 401)
        }
        return response.status(200).json({})
    }
}

module.exports = UserValidatedControllers