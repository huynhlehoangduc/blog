import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import {
  DeleteOutline,
  FileAddOutline,
  UnorderedListOutline,
  CheckCircleTwoTone,
  SaveOutline,
  SearchOutline,
  DashboardOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
} from '@ant-design/icons-angular/icons';

registerLocaleData(en);
const icons = [
  UnorderedListOutline,
  CheckCircleTwoTone,
  FileAddOutline,
  DeleteOutline,
  SaveOutline,
  SearchOutline,
  DashboardOutline,
  MenuFoldOutline,
  MenuUnfoldOutline
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzIconModule.forRoot(icons)
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
