import { LoadingManagerService } from './.models/loadingService';
import { UserService } from 'src/app/.services/user.service';
import { Component, OnInit } from '@angular/core';
import { ShakeService } from './.services/product.service';
import { ShakeFilter } from './.models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private shakeService: ShakeService,
    public loadingManagerService: LoadingManagerService
  ) {}
  //TODO: set default true to show the disclosure
  showDisclosure: boolean = true;

  ngOnInit(): void {
    this.userService.autoLogin();
  }
  title = 'ecommerce-angular';
}
