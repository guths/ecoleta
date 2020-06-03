import knex from 'knex';
import path from 'path'; //padronização de diretorio de arquivos dentro do projeto

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'), //É uma variavel global que retorna o diretorio do arquivo que esta executando ele
    },
    useNullAsDefault: true,
});

export default connection;
