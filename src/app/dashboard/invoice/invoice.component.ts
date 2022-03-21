import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { DailyProfitDto, ProductProfitDto } from 'src/app/core/types/dtos';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  public date: Date;
  public profits: ProductProfitDto[];
  public total: number;
  public isDateSelected: Boolean = false;
  public datePicked: Boolean = false;
  public selectedDate: Date;
  constructor(private productService: ProductService) {}

  @Output() close = new EventEmitter();

  ngOnInit(): void {}

  public getInvoice = () => {
    this.productService
      .dailyProfit(this.selectedDate.toISOString().slice(0, 10))
      .subscribe((res: DailyProfitDto[]) => {
        this.profits = res.slice(0, -1);
        this.total = res[res.length - 1]?.total;
      });
  };
}
