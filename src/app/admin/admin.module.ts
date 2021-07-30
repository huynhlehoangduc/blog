import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DashboardOutline, MenuFoldOutline, MenuUnfoldOutline } from '@ant-design/icons-angular/icons';

const icons = [DashboardOutline, MenuFoldOutline, MenuUnfoldOutline];

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzIconModule.forChild(icons),
  ],
})
export class AdminModule { }
