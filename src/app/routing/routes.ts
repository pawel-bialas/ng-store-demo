import {Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {ProductsComponent} from '../products/products.component';
import {MyOrdersComponent} from '../my-orders/my-orders.component';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';
import {CheckOutComponent} from '../check-out/check-out.component';
import {OrderSuccessComponent} from '../order-success/order-success.component';
import {AdminProductsComponent} from '../admin/admin-products/admin-products.component';
import {AdminOrdersComponent} from '../admin/admin-orders/admin-orders.component';
import {AuthGuardService} from '../authentication/auth-guard.service';
import {AdminAuthGuardService} from '../admin/admin-auth-guard.service';
import {ProductFormComponent} from '../admin/product-form/product-form.component';
import {AppComponent} from '../app.component';
import {HomeComponent} from '../home/home.component';


export const ROUTES: Routes = [

  {path: '', component: ProductsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'my/cart', component: ShoppingCartComponent},

  {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService]},
  {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]},
  {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService]},

  {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
  {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
  {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
  {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
];
