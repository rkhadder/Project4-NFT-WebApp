import express, { Express, Request, Response } from 'express';
import { SERVER_PORT } from './Config/Config';
import { logInfo } from './Config/Logger';
import registerRoutes from './Controllers/Controllers';

const app: Express = express();

registerRoutes(app);

app.listen(SERVER_PORT, () => {
  logInfo(`Server is running at https://localhost:${SERVER_PORT}`);
});