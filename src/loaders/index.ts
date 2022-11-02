import { Express } from 'express';
import { loadExpress } from './express';

function initLoaders (app: Express) {
  loadExpress(app);
}

export {
  initLoaders
};
