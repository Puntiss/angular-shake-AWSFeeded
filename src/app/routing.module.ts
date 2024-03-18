import { loadProductGuard } from './.guard/loadProductguard';
import { AuthGuard } from './.guard/authguard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ManageSessionComponent } from './manage-session/manage-session.component';
import { CartComponent } from './cart/cart.component';
import { ShakeInfoComponent } from './product/product-info/product-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
    resolve: { shakedata: loadProductGuard },
  },
  { path: 'login', component: ManageSessionComponent },
  { path: 'signup', component: ManageSessionComponent },
  {
    path: 'product/:id',
    component: ShakeInfoComponent,
    resolve: { shakedata: loadProductGuard },
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class CustomRoutingModule {}
