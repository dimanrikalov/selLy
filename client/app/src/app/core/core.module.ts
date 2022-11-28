import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ErrorPageComponent,
    WelcomePageComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ErrorPageComponent,
    WelcomePageComponent,
  ],
})
export class CoreModule {}
