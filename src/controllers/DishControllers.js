//importações
const knex = require("../database/knex")
const Diskstorage = require("../providers/DiskStorage")

class DishControllers {
    //visualiza
    async index(request, response) {
        const { title } = request.query

        const filteredDishes = await knex("ingredients")
            .distinct("dishes.id")
            .select([
                "dishes.id",
                "dishes.title",
                "dishes.image",
                "dishes.category",
                "dishes.price",
                "dishes.description"
            ])
            .where(function() {
                this.whereLike("dishes.title", `%${title}%`)
                    .orWhereLike("ingredients.title", `%${title}%`)
            })
            .innerJoin("dishes", "dishes.id", "ingredients.dish_id")

        const ingredients = await knex("ingredients")

        const dishesWithIngredients = filteredDishes.map(dish => {
            const dishIngredients = ingredients.filter(ingredient => ingredient.dish_id === dish.id)

            return {
                ...dish,
                ingredients: dishIngredients
            }

        })

        return response.json(dishesWithIngredients)
    }
    //cria
    async create(request, response) {
        const user_id = request.user.id
        const dishFileName = request.file.filename

        const {
            title,
            description,
            price,
            category,
            ingredients
        } = JSON.parse(request.body.data)

        const diskstorage = new Diskstorage()
        const filename = await diskstorage.saveFile(dishFileName)

        const [dish_id] = await knex("dishes").insert({
            title,
            description,
            price,
            category,
            image: filename,
            user_id
        })

        const ingredientsInsert = ingredients.map((ingredient) => ({ title: ingredient, dish_id}))

        await knex("ingredients").insert(ingredientsInsert)

        return response.status(201).json({})
    }
    //atualiza
    async update(request, response) {
        const dishFileName = request.file?.filename
        const { id } = request.params

        const {
            title,
            description,
            price,
            category,
            ingredients
        } = JSON.parse(request.body.data)

        const dish = await knex("dishes").where({ id }).first()

        const diskstorage = new Diskstorage()

        if (dishFileName) {
            
            if(dish.image) {
                await diskstorage.deleteFile(dish.image)
            }

            const filename = await diskstorage.saveFile(dishFileName)
            dish.image = filename
        }

        if (ingredients) {
            const oldIngredients = await knex("ingredients").select(["ingredients.title"]).where({ dish_id: dish.id})

            const titleOldIngredients = oldIngredients.map((e) => e.title)

            titleOldIngredients.forEach(async e => {
                if(!ingredients.includes(e)) {
                    await knex("ingredients").delete().where({ title: e})
                } 
            })

            const notIncludesInOldIngredients = []

            ingredients.forEach(async e => {
                if(!titleOldIngredients.includes(e)) {
                    notIncludesInOldIngredients.push(e)
                }
            })

            if (notIncludesInOldIngredients.length) {
                const ingredientsInsert = notIncludesInOldIngredients.map((ingredient) => ({ title: ingredient, dish_id: dish.id}))
    
                await knex("ingredients").insert(ingredientsInsert)
            }

        }

        const newDish = {
            title,
            description,
            price,
            category,
            image: dish.image
        }

        const updatedDish = Object.assign(dish, newDish)

        await knex("dishes").update(updatedDish).where({ id: dish.id })

        return response.json({})
    }
    //visualiza 1
    async show(request, response) {
        const { id } = request.params

        const filteredDishes = await knex("ingredients")
            .distinct("dishes.id")
            .select([
                "dishes.id",
                "dishes.title",
                "dishes.image",
                "dishes.category",
                "dishes.price",
                "dishes.description"
            ])
            .where({
                dish_id: id
            })
            .innerJoin("dishes", "dishes.id", "ingredients.dish_id")

            const ingredients = await knex("ingredients")
            
            const dishesWithIngredients = filteredDishes.map(dish => {
                const dishIngredients = ingredients.filter(ingredient => ingredient.dish_id === dish.id)
    
                return {
                    ...dish,
                    ingredients: dishIngredients
                }
    
            })
            return response.json(dishesWithIngredients)
    }
    //exclui
    async delete(request, response) {
        const { id } = request.params
        
        await knex("dishes").delete().where({ id })

        return response.json({})
    }
}

module.exports = DishControllers