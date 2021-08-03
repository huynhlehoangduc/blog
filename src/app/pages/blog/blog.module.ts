import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FooterModule } from '../../@core/components/footer/footer.module';
import { HeaderModule } from '../../@core/components/header/header.module';


@NgModule({
  declarations: [
    BlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    NzInputModule,
    NzIconModule,
    FooterModule,
    HeaderModule,
  ],
})
export class BlogModule { }
