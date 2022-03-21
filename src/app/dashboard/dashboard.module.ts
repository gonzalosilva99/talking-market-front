import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { ProductListComponent } from './product-list/product-list.component';
import { StockLevelPipe } from '../core/pipes/stock-level.pipe';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    ProductListComponent,
    StockLevelPipe,
    ProductCheckoutComponent,
    InvoiceComponent,
    MyOrdersComponent,
  ],
  imports: [
    CommonModule,
    MenuModule,
    DashboardRoutingModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    CalendarModule,
    FormsModule,
    AccordionModule,
    ToastModule,
  ],
})
export class DashboardModule {}
