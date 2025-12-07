console.log("URL DO BANCO DE DADOS NO RUNTIME:", process.env.DATABASE_URL);

import express, { Request, Response } from 'express';
import cors from "cors";
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import categoryRouters from './routes/categoryRoutes';

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


const PORT = 3333;

app.use(express.json());

app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRouters);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API do e-commerce em TypeScript está funcionando!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor TS rodando na porta ${PORT}`);
});
