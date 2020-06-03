import path from 'path'

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname,'src', 'database','database.sqlite'), //É uma variavel global que retorna o diretorio do arquivo que esta executando ele
    },
    migrations:{
        directory: path.resolve(__dirname,'src', 'database','migrations')
    },
    seeds:{
        directory: path.resolve(__dirname,'src', 'database','seeds')
    },
    useNullAsDefault: true,
};