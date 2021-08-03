import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { HeaderModule } from './@core/components/header/header.module';
import { FooterModule } from './@core/components/footer/footer.module';


@NgModule({
  declarations: [
    SiteComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    HeaderModule,
    FooterModule,
  ],
})
export class SiteModule { }
