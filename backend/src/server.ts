import app from './app';

const PORT = Number(process.env.PORT) || 3333;

console.log(`--- A INICIAR O SERVIDOR - ${new Date().toLocaleTimeString()} ---`);

app.listen(PORT, () => {
  console.log(`🚀 Servidor TS a correr na porta ${PORT}`);
});
