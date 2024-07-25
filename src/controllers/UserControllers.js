//importações
const { hash } = require("bcrypt")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class UserContreoller {
    async create(request, response) {
        const {
            name,
            email,
            password
        } = request.body

        const userEmailExist = await knex("users").where({email}).first()

        if(userEmailExist) {
            throw new AppError("E-mail em uso por outro usuario")
        }

        const passwordHased = await hash(password, 8)

        await knex("users").insert({
            name,
            email,
            password: passwordHased
        })

        return response.status(201).json({})
    }
}

module.exports = UserContreoller