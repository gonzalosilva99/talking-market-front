import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '**',
    component: DashboardComponent,
    children: [{ path: '', component: ProductListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
