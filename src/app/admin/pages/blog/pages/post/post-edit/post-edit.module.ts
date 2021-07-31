import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostEditRoutingModule } from './post-edit-routing.module';
import { PostEditComponent } from './post-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UnorderedListOutline } from '@ant-design/icons-angular/icons';


const icons = [UnorderedListOutline];

@NgModule({
  declarations: [
    PostEditComponent
  ],
  imports: [
    CommonModule,
    PostEditRoutingModule,
    ReactiveFormsModule,
    NzIconModule.forChild(icons),
    NzInputModule,
    NzCheckboxModule,
    NzFormModule,
    NzButtonModule,
    NzInputNumberModule,
  ],
})
export class PostEditModule { }
