import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDividerModule } from 'ng-zorro-antd/divider';


@NgModule({
  declarations: [
    BlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    NzInputModule,
    NzIconModule,
    NzSkeletonModule,
    NzSpaceModule,
    NzDividerModule,
  ],
})
export class BlogModule { }
