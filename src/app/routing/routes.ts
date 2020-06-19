import {Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {ProductsComponent} from '../products/products.component';
import {MyOrdersComponent} from '../my-orders/my-orders.component';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';
import {CheckOutComponent} from '../check-out/check-out.component';
import {OrderSuccessComponent} from '../order-success/order-success.component';
import {AdminProductsComponent} from '../admin/admin-products/admin-products.component';
import {AdminOrdersComponent} from '../admin/admin-orders/admin-orders.component';
import {AuthGuardService} from '../authentication/auth-guard.service';


export const ROUTES: Routes = [

  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'my/cart', component: ShoppingCartComponent},

  {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService]},
  {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]},
  {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService]},

  {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService]},
  {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService]},
];
