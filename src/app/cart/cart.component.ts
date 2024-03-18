import { Order } from './../.models/order';
import { LoadingManagerService } from './../.models/loadingService';
import {
  Component,
  DoCheck,
  DestroyRef,
  OnInit,
  AfterContentInit,
} from '@angular/core';
import { ShakeService } from '../.services/product.service';
import { UserService } from '../.services/user.service';
import { Cart, Shake, ShakeFilter } from '../.models/product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertService } from '../.services/alert.service';
import { ActivatedRoute } from '@angular/router';

const TAX_PERCENTAGE: number = 0.22;
const LAST_ORDERS: number = 5;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements DoCheck {
  constructor(
    public userService: UserService,
    private shakeService: ShakeService,
    private loadingManagerService: LoadingManagerService,
    private destroyRef: DestroyRef,
    private alertService: AlertService,
    public activatedRoute: ActivatedRoute
  ) {
    this.onLastOrders();
  }

  cartShakeList: Array<Cart> = this.userService.getCartShake().data;
  lastOrders: Array<Order> = new Array<Order>();

  subTotal: number = 0;
  discount: number = 0;
  tax: number = 0;
  total: number = 0;

  ngDoCheck() {
    this.updateBill();
  }

  calculateTotal() {
    let subTotal: number = 0;

    this.cartShakeList.forEach((cart) => {
      let response = this.shakeService.getShakeById(cart.id_product);
      if (response.code === 1) {
        let prod: Shake = response.data[0];

        subTotal += prod.discountedPrice * cart.qty;
        subTotal += prod.shippingPrice;
      }
    });
    this.subTotal = subTotal;
  }

  calculateDiscount() {
    let discount: number = 0; //12;
    //TODO: HardCoded
    this.discount = discount;
  }

  calculateTax() {
    if (this.subTotal > this.discount)
      this.tax = (this.subTotal - this.discount) * TAX_PERCENTAGE;
    else this.tax = 0;
  }

  updateBill() {
    this.calculateDiscount();
    this.calculateTotal();
    this.calculateTax();
    this.total = this.subTotal - this.discount + this.tax;
  }

  getTaxPercentage() {
    return TAX_PERCENTAGE;
  }

  onMakeOrder() {
    this.loadingManagerService.startLoading();
    this.userService
      .makeOder(this.total)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        console.log(response);

        this.loadingManagerService.stopLoading();
        if (response.code < 0) {
          this.alertService.showErrorMessage(response.message);
        } else {
          this.alertService.showSuccessMessage(response.message);
          this.userService.clearCart();
          this.cartShakeList = this.userService.getCartShake().data;
          this.onLastOrders();
        }
      });
  }

  onLastOrders() {
    this.loadingManagerService.startLoading();
    this.userService
      .getLastOrders()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        this.loadingManagerService.stopLoading();
        console.log(response);
        if (response.code === 1) {
          var lo: Array<Order> = new Array<Order>();

          for (let i = 0; i < LAST_ORDERS && i < response.data[0].length; i++) {
            let order = response.data[0][i];
            lo.push(
              new Order(order.id, order.id_user, order.element, order.total)
            );
          }

          this.lastOrders = lo;
        }
      });
  }
}
