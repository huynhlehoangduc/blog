import { enableProdMode } from '@angular/core';
import 'localstorage-polyfill';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

global['localStorage'] = localStorage;

export { AppServerModule } from './app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
