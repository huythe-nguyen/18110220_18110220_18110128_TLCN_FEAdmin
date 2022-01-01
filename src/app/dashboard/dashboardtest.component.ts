import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Carts } from '../models/cart';
import { DataService } from '../services/data.service';
import { RestApiService } from '../services/rest-api.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  templateUrl: 'dashboardtest.component.html',
  styleUrls: [ './dashboardtest.component.scss']
})
export class DashboardComponentTest implements OnInit {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  oder1!: Carts[];
  count:number
  count2:number
  count1!: Carts;
  btnDisabled = false;
  url = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/oder/dashboard'
  url1 = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/oder/count'
  deleteId!: string;
  confirmMessage = '';
  key = '';
  size=10;
  page=1;
  total=0;
  number=0;
  day=0;
  days=0;
  constructor(private rest: RestApiService,
    private data: DataService,
    private modalService: NgbModal) {

  }
  search(keys: string) {
    if (keys !== '') {
      this.key = keys;
      this.ngOnInit();
    }
  }
  LoadPagesize(event: PageEvent) {
    if (event.pageSize != 0 || event.pageIndex >=0) {
      this.size = event.pageSize
      this.page = event.pageIndex + 1
      console.log(this.page)
    }
    this.ngOnInit()
  }
  Loadday(days: number) {
    console.log(days)
    const number=0;
    const total=0;
    if (days > -1) {
      this.day = days;
      this.days = days;
      this.ngOnInit()
      this.number= number
      this.total=total
    }
  }
  ngOnInit() {
    this.btnDisabled = true;
    this.rest.getDashboard(this.url, this.page, this.size, this.day, 'success').then(data => {
      this.oder1 = (data as { oder: Carts[] }).oder;
      for (let index = 0; index < this.oder1.length; index++) {
        const element = this.oder1[index];
        this.total += element.total
        for (let index = 0; index < element.products.length; index++) {
          const number1 = element.products[index];
          this.number +=number1.quantity
        }
      }
      this.btnDisabled = false;
      console.log(this.oder1);
    })
    this.rest.getCountDashboard(this.url1,this.day,'cancel').then(data => {
      let value = data as { count:number}
      this.count= value.count;
      this.btnDisabled = false;
      console.log(this.count);
      console.log(value);
    })
    this.rest.getCountDashboard(this.url1,this.day,'success').then(data => {
      let value = data as { count:number}
      this.count2= value.count;
      this.btnDisabled = false;
      console.log(this.count);
      console.log(value);
    })
  }
}
