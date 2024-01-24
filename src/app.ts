import express, {Request, Response} from 'express'
import { boardsRouter } from './routers/boards-router'
import cors from "cors";

export const app = express()

const whitelist = ['https://pashkaa.github.io', 'http://example2.com'];

// ✅ Enable pre-flight requests
app.options('*', cors());

const corsOptions = {
  credentials: true,
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};


app.use(cors(corsOptions));

app.use(express.json())

app.use('/api', boardsRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Test APP BackEnd is running!')
})

