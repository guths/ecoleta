import knex from '../database/connection';
import {Request, Response} from 'express';
 

class PointsController {
    async index(req: Request , res : Response){
        const {city , uf, items} = req.query;

        const parsedItems = String(items).split(',').map(item=> Number(item.trim()))

        const points = await knex('points').
            join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return res.json(points);
    }


    async show(req : Request, res : Response) {
        const { id } = req.params;

        const point = await knex('points').where('id',id).first();

        if(!point) {
            return res.status(400).json({
                message : 'error, point not found'
            })
        }

        const items = await knex('items').
            join('point_items','items.id', '=','point_items.item_id').
            where('point_items.point_id',id).
            select('items.title'); 

        return res.json({point , items})
    }

    async create ( req : Request, res : Response) {
        const { name, email, whatsapp, latitude, longitude, city, uf, items} = req.body;
    
        const trx = await knex.transaction(); // serve que se uma inserção nao der certo ele acaba nao errando na proxima 

        const point = {image: 'https://images.unsplash.com/photo-1501523460185-2aa5d2a0f981?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60-fake', name, email, whatsapp, latitude, longitude, city, uf}
    
        const insertedIds = await trx('points').insert(point) //short sintax = mesma coisa que name : name, quando nome da variavel é a mesma da propriedade do objeto é possivel emitir
        // o metodo insert do knex retorna os dados dos dados que foram inseridos
    
        const point_id = insertedIds[0];
    
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            };
        })
    
        await trx('point_items').insert(pointItems);

        await trx.commit();
    
        return res.json({
            id: point_id,
            ...point, //spread operator
            
        })
    }
}

export default PointsController;