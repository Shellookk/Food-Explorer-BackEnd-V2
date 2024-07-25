
exports.up = knex => knex.schema.createTable("dishes" , table => {
    table.increments("id");
    table.text("title").notNullable();
    table.text("description");
    table.float("price")
    table.text("image")
    table.text("category")
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
    table.integer("user_id").references("id").inTable("users");
})


exports.down = knex => knex.schema.dropTable("dishes")
