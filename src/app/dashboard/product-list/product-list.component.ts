import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductDto, ProductToBuy } from 'src/app/core/types/dtos';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [MessageService],
})
export class ProductListComponent implements OnInit, OnDestroy {
  public products: ProductDto[];
  public productsFiltered: ProductDto[];
  public isOwner: boolean;
  public productsToBuy: ProductToBuy[] = [];

  private searchSubscription: Subscription;
  private productsToBuySubscription: Subscription;
  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.isOwner = this.authService.getUser.isOwner;
    this.searchSubscription = this.productService.searchValue.subscribe(
      (search) => {
        this.filterProducts(search);
      }
    );
    this.productsToBuySubscription =
      this.productService.productsToBuy.subscribe((products) => {
        this.productsToBuy = products ? products : [];
      });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  public getProducts = async () => {
    this.productService.getProducts().subscribe((res: ProductDto[]) => {
      this.products = res;
      this.productsFiltered = this.products;
    });
  };

  public addProduct = async (product: ProductDto) => {
    const productToBuy: ProductToBuy = this.productsToBuy[product.id];
    if (productToBuy) {
      if (productToBuy.units === productToBuy.product.stock) {
        this.messageService.add({
          key: 'tc',
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error with your order, please try again later.',
        });
      } else {
        this.productsToBuy[product.id].units =
          this.productsToBuy[product.id].units + 1;
      }
    } else {
      this.productsToBuy[product.id] = {
        product,
        units: 1,
      };
    }
    this.productService.setProductsToBuy = this.productsToBuy;
  };

  public removeProduct = async (product: ProductDto) => {
    const productToBuy: ProductToBuy = this.productsToBuy[product.id];
    if (productToBuy && productToBuy.units > 0) {
      productToBuy.units = productToBuy.units - 1;
      if (productToBuy.units === 0) {
        this.productsToBuy[product.id] = undefined;
      }
      this.productService.setProductsToBuy = this.productsToBuy;
    }
  };

  private filterProducts = (filterValue: string) => {
    this.productsFiltered = this.products.filter(
      (product) =>
        product.name
          .toLocaleLowerCase()
          .indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        product.description
          .toLocaleLowerCase()
          .indexOf(filterValue.toLocaleLowerCase()) !== -1
    );
  };
}
