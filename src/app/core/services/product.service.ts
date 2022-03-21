import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CreateOrderDto,
  DailyProfitDto,
  OrderDto,
  ProductDto,
  ProductToBuy,
} from '../types/dtos';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiHost: string = `${environment.apiHost}`;
  private productsToBuySubject: BehaviorSubject<ProductToBuy[]> =
    new BehaviorSubject(undefined);
  public productsToBuy: Observable<ProductToBuy[]> =
    this.productsToBuySubject.asObservable();

  private searchValueSubject: Subject<string> = new Subject<string>();
  public searchValue: Observable<string> =
    this.searchValueSubject.asObservable();

  constructor(private http: HttpClient) {}

  public set search(value: string) {
    this.searchValueSubject.next(value);
  }

  public get getProductsToBuy() {
    return this.productsToBuySubject.value;
  }

  public set setProductsToBuy(products: ProductToBuy[]) {
    this.productsToBuySubject.next(products);
  }

  public getProducts = (): Observable<ProductDto[]> =>
    this.http.get(`${this.apiHost}/products`).pipe(
      map((res: ProductDto[]) => {
        return res;
      })
    );

  public getMyOrders = (): Observable<OrderDto[]> =>
    this.http.get(`${this.apiHost}/orders`).pipe(
      map((res: OrderDto[]) => {
        return res;
      })
    );

  public createOrder = (order: CreateOrderDto[]): Observable<OrderDto> =>
    this.http.post(`${this.apiHost}/orders`, order).pipe(
      map((res: OrderDto) => {
        return res;
      })
    );

  public dailyProfit = (date: string): Observable<DailyProfitDto[]> =>
    this.http
      .get(`${this.apiHost}/orders/dailyprofit`, { params: { date } })
      .pipe(
        map((res: DailyProfitDto[]) => {
          return res;
        })
      );
}
