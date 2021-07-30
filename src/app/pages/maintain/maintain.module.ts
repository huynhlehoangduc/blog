import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintainComponent } from './maintain.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MaintainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MaintainComponent }])
  ]
})
export class MaintainModule { }
