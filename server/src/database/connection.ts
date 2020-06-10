import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'sqlite3', //no caso estamos usando sqlite mas o knex funciona para MySQL e Postgres
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')//__dirname retorna o caminho para o diretório que estou criando a conexão
    },
    useNullAsDefault: true,
});

export default connection;

// Migration: histórico do banco de dados
//