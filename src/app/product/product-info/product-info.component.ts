import { ShakeService } from './../../.services/product.service';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shake } from 'src/app/.models/product';
import { UserService } from 'src/app/.services/user.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
})
export class ShakeInfoComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private shakeService: ShakeService,
    private userService: UserService,
    private router: Router
  ) {}
  product: Shake;
  isAdding: boolean = false;
  pendingQty: number = 1;

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.paramMap.get('id');

    let response = this.shakeService.getShakeById(id);
    console.log(response);
    if (response.code === 1) {
      this.product = response.data[0];
    }
    this.updatePendingQty();
  }

  updatePendingQty() {
    let response = this.userService.getCartShakeById(this.product.id);
    if (response.code > 0) this.pendingQty = response.data[0].qty;
    else this.pendingQty = 1;
  }

  onAdd() {
    if (this.userService.userIsLogged()) {
      if (this.product.isAvailable()) this.isAdding = true;
    } else this.router.navigateByUrl('/login');
  }

  onConfirm() {
    if (this.userService.userIsLogged()) {
      //alert('Shake added to cart');
      this.userService.setInCart(this.product.id, this.pendingQty);
    } else this.router.navigateByUrl('/login');

    this.onClear();
  }

  onClear() {
    this.isAdding = false;
    this.updatePendingQty();
  }

  plusQty() {
    if (this.pendingQty < this.product.qtyAvailable) this.pendingQty++;
  }

  lessQty() {
    if (this.pendingQty > 1) this.pendingQty--;
  }

  onBuyNow() {
    this.onConfirm();
    this.router.navigateByUrl('/cart');
  }
}
