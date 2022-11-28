import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './core/about/about.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard, InversedAuthGuard } from './guards/is-logged-in.guard';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { WelcomePageComponent } from './core/welcome-page/welcome-page.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { SavedListingsPageComponent } from './saved-listings/saved-listings.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomePageComponent,
  },
  {
    path: 'catalog',
    pathMatch: 'full',
    component: CatalogPageComponent,
  },
  {
    path: 'catalog',
    children: [
      {
        path: 'create',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        component: CreateListingComponent,
      },
      {
        path: ':id',
        children: [
          {
            path: 'details',
            pathMatch: 'full',
            component: ListingDetailsComponent,
          },
          {
            path: 'edit',
            pathMatch: 'full',
            canActivate: [AuthGuard],
            component: EditListingComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        pathMatch: 'full',
        canActivate: [InversedAuthGuard],
        component: RegisterPageComponent,
      },
      {
        path: 'login',
        pathMatch: 'full',
        canActivate: [InversedAuthGuard],
        component: LoginPageComponent,
      },
    ],
  },
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent,
  },
  {
    path: 'profile',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: ProfilePageComponent,
  },
  {
    path: 'saved',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: SavedListingsPageComponent,
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
