import knex from '../database/connection';
import {Request, Response} from 'express';
//na comunidade é comum utilizar os seguintes métodos:
//index quando é uma listagem; show se for exibir um registro, create, update, delete
class ItensController {
    async index(request: Request, response: Response) {
        const itens = await knex('itens').select('*');
        //SELECT * FROM ITENS]
        const serializedItens = itens.map(itens => {
            return {
                id: itens.id,
                title: itens.title,
                image_url: `http://localhost:3333/uploads/${itens.image}`,    
            };
        })
        return response.json(serializedItens);
    }
}

export default ItensController;