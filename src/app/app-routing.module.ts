import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintainComponent } from './pages/maintain/maintain.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '404', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: 'maintain', loadChildren: () => import('./pages/maintain/maintain.module').then(m => m.MaintainModule) },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
