import express from 'express';
import cors from 'cors';
import menuRouter from './routes/menu';
import ordersRouter from './routes/ordenes';

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({ origin: true })); 
app.use(express.json());


app.use('/api/menu', menuRouter);
app.use('/api/orders', ordersRouter);


app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
    console.log(`Mock API server listening on http://localhost:${PORT}`);
});
