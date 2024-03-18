import { Shake } from 'src/app/.models/product';
import { ShakeService } from 'src/app/.services/product.service';
import { Cart } from './../../.models/product';
import {
  Component,
  Input,
  AfterViewInit,
  EventEmitter,
  Output,
  ViewChild,
  DoCheck,
  OnInit,
} from '@angular/core';
import { UserService } from 'src/app/.services/user.service';

@Component({
  selector: 'app-cart-product-list',
  templateUrl: './cart-product-list.component.html',
  styleUrls: ['./cart-product-list.component.css'],
})
export class CartShakeListComponent implements DoCheck, OnInit {
  constructor(
    private shakeService: ShakeService,
    private userService: UserService
  ) {}

  @ViewChild('selectQty') selectQty: HTMLSelectElement;
  @Input() cartElement: Cart;
  product: Shake;
  @Output()
  removeShakeFromCart: EventEmitter<string> = new EventEmitter<string>();
  pendingQty: number = 1;
  isAdding: boolean = false;

  ngOnInit() {
    this.pendingQty = this.cartElement.qty;
  }

  ngDoCheck(): void {
    let response = this.shakeService.getShakeById(this.cartElement.id_product);
    this.product = response.data[0];
  }

  qtySyncErrClient() {
    let diff = this.cartElement.qty - this.product.qtyAvailable;
    if (diff > 0) return diff;
    return null;
  }

  updatePendingQty() {
    let response = this.userService.getCartShakeById(this.product.id);
    if (response.code > 0) this.pendingQty = response.data[0].qty;
    else this.pendingQty = 1;
  }

  onAdd() {
    if (this.product.isAvailable()) this.isAdding = true;
  }

  onConfirm() {
    if (this.userService.userIsLogged()) {
      //alert('Shake added to cart');
      this.userService.setInCart(this.product.id, this.pendingQty);
    }
    this.onClear();
  }

  onClear() {
    this.isAdding = false;
    this.updatePendingQty();
  }

  plusQty() {
    this.isAdding = true;
    if (this.pendingQty < this.product.qtyAvailable) this.pendingQty++;
    console.log(this.product);
  }

  lessQty() {
    this.isAdding = true;
    if (this.pendingQty > 1) this.pendingQty--;
  }
}
