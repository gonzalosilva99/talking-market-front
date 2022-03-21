import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductToBuy, UserDto } from 'src/app/core/types/dtos';
import * as _ from 'lodash';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MessageService],
})
export class MenuComponent implements OnInit, OnDestroy {
  public user: UserDto;
  public productsSubscription: Subscription;
  public amountOfProducts: number = 0;
  public showCart: boolean = false;
  public showInvoice: boolean = false;
  public showMyOrders: boolean = false;
  private searchSubject: Subject<string> = new Subject<string>();
  private searchSubscription: Subscription;
  public menuItems: MenuItem[];

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        filter((x) => x?.length > 2 || x?.length === 0),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((search) => {
        this.productService.search = search;
      });
    this.user = this.authService.getUser;
    this.productsSubscription = this.productService.productsToBuy.subscribe(
      (products: ProductToBuy[]) => {
        if (products) {
          this.amountOfProducts = _.sum(
            products.map((product) => product?.units)
          );
        } else {
          this.amountOfProducts = 0;
        }
      }
    );
    this.menuItems = [
      {
        label: 'My Orders',
        command: () => {
          this.showMyOrders = true;
        },
      },
      {
        label: 'Logout',
        command: () => {
          this.authService.logout();
        },
      },
    ];
  }

  public inputChange(event: any) {
    this.searchSubject.next(event.target.value);
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }
}
