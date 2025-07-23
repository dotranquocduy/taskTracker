import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './database/data-source';

// lang nghe su kien (5000)
// ✅ Kết nối database trước, sau đó mới chạy server
AppDataSource.initialize()
  .then(() => {
    console.log('Connected to Postgres');
    app.listen(process.env.PORT || 5000, () => console.log('Server started on http://localhost:5000'));
  })
  .catch((error) => console.log(error));