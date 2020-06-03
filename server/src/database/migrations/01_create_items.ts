import Knex from 'knex';

export async function up(knex: Knex){
    //Função que cria dentro do banco.
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    })

}
export async function down(knex: Knex){
    //Função que volta atrás dentro do banco, ou seja, deleta.
    return knex.schema.dropTable('items')
}