import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CheckCircleTwoTone,
  DashboardOutline,
  DeleteOutline,
  FileAddOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  SaveOutline,
  SearchOutline,
  UnorderedListOutline,
  StarOutline,
  LockOutline,
  UserOutline
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';


const icons = [
  UnorderedListOutline,
  CheckCircleTwoTone,
  FileAddOutline,
  DeleteOutline,
  SaveOutline,
  SearchOutline,
  DashboardOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  StarOutline,
  LockOutline,
  UserOutline
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzIconModule.forRoot(icons)
  ]
})
export class IconModule { }
