import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HeaderModule } from '../../@core/components/header/header.module';
import { FooterModule } from '../../@core/components/footer/footer.module';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeaderModule,
    FooterModule,
    NzInputModule,
    NzIconModule,
    NzListModule,
    NzPaginationModule,
    NzSkeletonModule,
  ],
})
export class HomeModule { }
