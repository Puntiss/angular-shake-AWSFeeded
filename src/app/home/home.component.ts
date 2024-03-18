import { LoadingManagerService } from './../.models/loadingService';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAX_PRICE,
  MAX_PRODUCT_X_PAGE,
  Shake,
  ShakeFilter,
} from '../.models/product';
import { ShakeService } from './../.services/product.service';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { Response } from '../.models/response';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private shakeService: ShakeService,
    private destroyRef: DestroyRef,
    private loadingManagerService: LoadingManagerService
  ) {
    this.setShake();
  }
  productList: Array<Shake> = new Array<Shake>();
  filter: ShakeFilter = new ShakeFilter('', [1, 2, 3, 4, 5], {
    priceMin: 0,
    priceMax: MAX_PRICE,
  });
  filterOnRating: FormGroup = new FormGroup({
    star5: new FormControl(1),
    star4: new FormControl(1),
    star3: new FormControl(1),
    star2: new FormControl(1),
    star1: new FormControl(1),
  });
  filterOnDiscountedPrice: FormGroup = new FormGroup({
    priceMin: new FormControl(0, [
      Validators.min(0),
      Validators.max(MAX_PRICE),
    ]),
    priceMax: new FormControl(MAX_PRICE, [
      Validators.min(0),
      Validators.max(MAX_PRICE),
    ]),
  });
  reactiveFilter: FormGroup;

  ngOnInit() {
    this.reactiveFilter = new FormGroup({
      filterOnRating: this.filterOnRating,
      filterOnDiscountedPrice: this.filterOnDiscountedPrice,
    });
  }

  setShake() {
    this.loadingManagerService.startLoading();
    this.shakeService
      .getShake(this.filter)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response: Response) => {
        //console.log(response);
        this.productList = response.data;
        this.loadingManagerService.stopLoading();
      });
  }

  onFilterRating(star: number) {
    let index = this.filter.filterOnRating.indexOf(star);
    if (index === -1) this.filter.filterOnRating.push(star);
    else this.filter.filterOnRating.splice(index, 1);

    //console.log(this.filter.filterOnRating);
    this.setShake();
  }

  onFilterName() {
    //console.log(this.filter.filterOnName);
    this.setShake();
  }

  onFilterDiscountPrice() {
    if (this.filterOnDiscountedPrice.valid) {
      this.filter.filterOnDiscountedPrice.priceMin =
        this.filterOnDiscountedPrice.get('priceMin').value;
      this.filter.filterOnDiscountedPrice.priceMax =
        this.filterOnDiscountedPrice.get('priceMax').value;
      //console.log(this.filter.filterOnDiscountedPrice.priceMin);
      //console.log(this.filter.filterOnDiscountedPrice.priceMax);
      this.setShake();
    }
  }

  getMAX_PRODUCT_X_PAGE() {
    return MAX_PRODUCT_X_PAGE;
  }
}
