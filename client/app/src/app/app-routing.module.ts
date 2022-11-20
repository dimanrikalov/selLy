import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { AboutComponent } from './core/about/about.component';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { WelcomePageComponent } from './core/welcome-page/welcome-page.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SavedListingsPageComponent } from './saved-listings/saved-listings.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomePageComponent
  },

  {
    path: 'catalog',
    pathMatch: 'full',
    component: CatalogPageComponent,
    children: [
      {
        path: 'catalog/create',
        component: CreateListingComponent
      },
      {
        path: 'catalog/:id/edit',
        component: EditListingComponent
      },
      {
        path: 'catalog/:id/delete',
        redirectTo: 'catalog'
      },
    ]
  },
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent
  },
  {
    path: 'auth/register',
    pathMatch: 'full',
    component: RegisterPageComponent
  },
  {
    path: 'auth/login',
    pathMatch: 'full',
    component: LoginPageComponent
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfilePageComponent
  },
  {
    path: 'saved',
    pathMatch: 'full',
    component: SavedListingsPageComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: ErrorPageComponent
  }
  // add 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
