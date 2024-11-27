import {Sequelize} from 'sequelize';
import connectionDb from './database/connectionDb.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
}) 

export const app = express();