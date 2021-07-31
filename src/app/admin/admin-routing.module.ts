import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'post-list', loadChildren: () => import('./pages/blog/pages/post/post-list/post-list.module').then(m => m.PostListModule) },
      { path: 'post-edit', loadChildren: () => import('./pages/blog/pages/post/post-edit/post-edit.module').then(m => m.PostEditModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
