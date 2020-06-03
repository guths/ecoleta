import Knex from 'knex';

export async function up(knex: Knex){
    //Função que cria dentro do banco.
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();
        table.integer('point_id').notNullable().references('id').inTable('points');
        table.integer('item_id').notNullable().notNullable().references('id').inTable('items');
    })

}
export async function down(knex: Knex){
    //Função que volta atrás dentro do banco, ou seja, deleta.
    return knex.schema.dropTable('point_items')
}