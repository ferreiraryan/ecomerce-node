import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = 3333;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API do e-commerce em TypeScript está funcionando!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor TS rodando na porta ${PORT}`);
});
