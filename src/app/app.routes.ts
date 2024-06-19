import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderComponent } from './pages/order/order.component';
import { ProductsComponent } from './admin/products/products.component';
import { CategoryComponent } from './admin/category/category.component';
import { CreateproductComponent } from './admin/products/createproduct/createproduct.component';
import { OrderAdminComponent } from './admin/order/order.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order', component: OrderComponent},
  { path: 'admin', component: ProductsComponent},
  { path: 'admin/product', component: ProductsComponent},
  { path: 'admin/createproduct', component: CreateproductComponent},
  { path: 'admin/category', component: CategoryComponent},
  { path: 'admin/order', component: OrderAdminComponent},

];
