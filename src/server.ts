import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    //mongoose connector
    await mongoose.connect(config.DB_URL as string);

    //server connector
    server = app.listen(config.PORT, () => {
      console.log(`Server on port ${config.PORT} ⚡`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.log(`😡 unhandledRejection is detected, shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('😈 uncaughtException is detected, shutting down ...');
  process.exit(1);
});
