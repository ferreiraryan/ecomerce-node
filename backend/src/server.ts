console.log("URL DO BANCO DE DADOS NO RUNTIME:", process.env.DATABASE_URL);

import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';

const app = express();
const PORT = 3333;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API do e-commerce em TypeScript está funcionando!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor TS rodando na porta ${PORT}`);
});
