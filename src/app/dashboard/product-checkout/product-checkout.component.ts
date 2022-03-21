import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { CreateOrderDto, ProductToBuy } from 'src/app/core/types/dtos';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.css'],
  providers: [MessageService],
})
export class ProductCheckoutComponent implements OnInit {
  // public productsSubscription: Subscription;
  public products: ProductToBuy[] = [];

  @Output() close = new EventEmitter();
  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProductsToBuy?.filter((n) => n);
  }

  createOrder = async () => {
    try {
      const order: CreateOrderDto[] = this.products?.map((product) => ({
        product_id: product.product.id,
        units: product.units,
      }));
      this.productService.createOrder(order).subscribe((res) => {
        if (res) {
          this.productService.setProductsToBuy = undefined;
          this.messageService.add({
            key: 'tc',
            severity: 'success',
            summary: 'Success',
            detail: 'Your order has been created successfully.',
          });
        } else {
          this.messageService.add({
            key: 'tc',
            severity: 'error',
            summary: 'Error',
            detail:
              'There was an error with your order, please try again later.',
          });
        }
      });
    } catch (err) {}
  };
}
