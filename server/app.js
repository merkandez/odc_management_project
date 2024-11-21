import {Sequelize} from 'sequelize';
import connectionDb from './database/connectionDb.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


export const app = express();