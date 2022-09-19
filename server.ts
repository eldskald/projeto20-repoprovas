import dotenv from 'dotenv';
import app from './src/app';
dotenv.config();

const PORT: number = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});