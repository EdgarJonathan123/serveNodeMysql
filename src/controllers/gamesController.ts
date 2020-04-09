import { Request,Response } from 'express';
import pool from '../database';

class GamesController {

    constructor() { }


    public async list(req:Request, res :Response ) {
        const games = await pool.query('select * from game ');
        res.json(games);
        //res.json({text:'Listando Juegos'});
       //pool.query('DESCRIBE game');
       //res.json('games');
        //res.send('games controller papu ');
    }

    public async getOne(req:Request, res:Response): Promise<void> {
        const {id}  = req.params;
        const games = await pool.query('select * from game where id = ?',[id]);
        console.log(games);
        if(games.length > 0){
             res.json(games[0]);
             return;
        }
            res.status(404).json({text:'El juego no existe'});
        
    
        // res.json({text:'this is game '+req.params.id});
    }

    public async create (req:Request ,res:Response):Promise<void> {
        await pool.query('insert into game set ?',req.body);
        console.log(req.body);
        res.json({text:'Juego Guardado'}); 
    }


    public async delete(req:Request, res:Response):Promise<void>{
        const  {id} = req.params; 
        await pool.query('delete from game where id = ?',[id]);
        res.json({text: 'el juego fue eliminado'});
        //res.json({text:' eliminando un juego '+req.params.id});
    }

    public async update(req:Request, res:Response):Promise<void>{
        const  {id} = req.params; 
        await pool.query('update game set ? where id = ?', [req.body, id]);
       
        res.json({message:'el juego con id:'+req.params.id+' fue actualizado'});
    }

}

const gamesController = new GamesController();

export default gamesController;