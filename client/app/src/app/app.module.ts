import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { SavedListingsPageComponent } from './saved-listings/saved-listings.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    CreateListingComponent,
    EditListingComponent,
    ProfilePageComponent,
    ListingDetailsComponent,
    SavedListingsPageComponent
  ],
  imports: [BrowserModule, CoreModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
