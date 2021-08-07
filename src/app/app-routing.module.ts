import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './@core/guards/admin.guard';

const routes: Routes = [
  { path: '404', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: 'maintain', loadChildren: () => import('./pages/maintain/maintain.module').then(m => m.MaintainModule) },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  { path: 'admin-login', loadChildren: () => import('./pages/admin-login/admin-login.module').then(m => m.AdminLoginModule) },
  { path: '', pathMatch: 'full', loadChildren: () => import('./site/site.module').then(m => m.SiteModule) },
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
