import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shake } from 'src/app/.models/product';
import { UserService } from 'src/app/.services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ShakeListComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  @Input() product: Shake;
  isAdding: boolean = false;
  pendingQty: number = 1;
  ngOnInit(): void {
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
}
