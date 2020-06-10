import knex from '../database/connection';
import {Request, Response} from 'express';
class PointsController {
    async show(request: Request, response: Response) {
        const { id } = request.params;
        
        const point = await knex('points').where('id', id).first();
        
        if(!point){
            return response.status(400).json({message: 'Point not found'});
        }

        /**
         * SELECT * FROM itens
         * JOIN point_itens ON itens_id = point_itens.itens_id
         * WHERE point_itens.point_id = {id}
         */
        const itens = await knex('itens')
          .join('point_itens', 'itens.id', '=', 'point_itens.item_id')
          .where('point_itens.point_id', id)
          .select('itens.title');
        return response.json({point, itens});
    }
    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            itens
        } = request.body;
    
        const trx = await knex.transaction();
        const point = {
            image: 'image-https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
        const insertedIds = await trx('points').insert(point);
        
        const point_id = insertedIds[0];
        const pointItens = itens.map((item_id: number) =>{
            return{
                item_id,
                point_id
            }
        })
        await trx('point_itens').insert(pointItens);    
        
        await trx.commit();

        return response.json({
            id: point_id,
            ... point,

        });
    }
    async index(request:Request, response: Response){
        //filtro de cidade, uf, itens e pegaremos do Query Params
        const {city, uf, itens} = request.query;
        //console.log(city, uf, itens);
        const parsedItens = String(itens).split(',').map(item => Number(item.trim()));
         
        const points = await knex('points')
          .join('point_itens', 'points.id', '=', 'point_itens.point_id')
          .whereIn('point_itens.item_id', parsedItens)
          .where('city', String(city))
          .where('uf', String(uf))
          .distinct()
          .select('points.*');

        
        return response.json(points);
    }
}

export default PointsController;