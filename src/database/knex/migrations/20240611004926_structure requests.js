
exports.up = knex => knex.schema.createTable("requests", table => {
    table.increments("id");
    table.integer("dish_id").references("id").inTable("dishes")
    table.integer("user_id").references("id").inTable("users")
    table.integer("quatity")
    table
        .enu("payment_type", ["money", "pix", "card"], { useNative: true, enumName: "payments"})
        .notNullable().default("money")
    
    table
        .enu("dish_status", ["waiting", "preparing", "ready"], { useNative: true, enumName: "dishes"})
        .notNullable().default("waiting")
    
        table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
})


exports.down = knex => knex.schema.dropTable("requests")
