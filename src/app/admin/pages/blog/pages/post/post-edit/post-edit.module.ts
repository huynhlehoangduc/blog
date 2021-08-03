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
import { EditorModule } from '@tinymce/tinymce-angular';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzUploadModule } from 'ng-zorro-antd/upload';


@NgModule({
  declarations: [
    PostEditComponent
  ],
  imports: [
    CommonModule,
    PostEditRoutingModule,
    ReactiveFormsModule,
    NzInputModule,
    NzCheckboxModule,
    NzFormModule,
    NzButtonModule,
    NzInputNumberModule,
    EditorModule,
    NzSpinModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzUploadModule,
    NzIconModule
  ],
})
export class PostEditModule { }
