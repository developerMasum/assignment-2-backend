import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';

// parser
const app: Application = express();
app.use(express.json());
app.use(cors());


// 
app.use('/api/users',userRoutes)

const getAController = (req: Request, res: Response) => {
  res.send('welcome to user management server !');
}

app.get('/',getAController );

export default app;
