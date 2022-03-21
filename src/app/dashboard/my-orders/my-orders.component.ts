import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { OrderDto } from 'src/app/core/types/dtos';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  public orders: OrderDto[] = [];
  public priceOfOrders: number[] = [];
  public dateOfOrders: string[] = [];
  toLocalDate = this.toLocalDateString;
  @Output() close = new EventEmitter();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getOrders();
    this.calcPricePerOrder();
  }

  private getOrders = () => {
    this.productService.getMyOrders().subscribe((orders: OrderDto[]) => {
      this.orders = orders;
      this.calcPricePerOrder();
    });
  };

  private calcPricePerOrder = () => {
    this.orders.forEach((order) => {
      this.priceOfOrders[order.id] = 0;
      order.products.forEach((unitprod) => {
        this.priceOfOrders[order.id] =
          unitprod.price + unitprod.UnitsProducts.units;
      });
    });
  };

  private toLocalDateString(date: Date) {
    return date.toISOString().slice(0, 10);
  }
}
