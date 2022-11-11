import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AboutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AboutComponent
  ]
})
export class CoreModule { }
