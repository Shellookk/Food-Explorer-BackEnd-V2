//importações
const knex = require("../database/knex")

class RequestControllers {
    //visualiza
    async index(request, response) {

        const requests = await knex("requests")
            .innerJoin("dishes", "requests.dish_id", "dishes.id")
            .innerJoin("users", "requests.user_id", "users.id")

        return response.json(requests)
    }
    //cria
    async create(request, response) {
        const user_id = request.user.id

        const { 
            dish_id,
            payment_type,
            quantity
        } = request.body

        await knex("requests").insert({ dish_id, user_id, payment_type, quantity })

        return response.status(201).json({})
    }
    //atualiza
    async update(request, response) {
        const { id } = request.params
        const { dish_status } = request.body

        await knex("requests").update({ dish_status }).where({ id })

        return response.json({})
    }
    //deleta
    async delete(request, response) {
        const { id } = request.params

        await knex("requests").delete().where({ id })

        return response.json({})
    }
}

module.exports = RequestControllers