import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostListRoutingModule } from './post-list-routing.module';
import { PostListComponent } from './post-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DeleteOutline } from '@ant-design/icons-angular/icons';

const icons = [DeleteOutline];

@NgModule({
  declarations: [
    PostListComponent
  ],
  imports: [
    CommonModule,
    PostListRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule.forChild(icons),
  ],
})
export class PostListModule { }
