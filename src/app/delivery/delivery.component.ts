import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Carts } from '../models/cart';
import { DataService } from '../services/data.service';
import { RestApiService } from '../services/rest-api.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }


  oder3!: Carts[];
  count2:number
  btnDisabled = false;
  url = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/oder'
  url1='https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/oder?state=confimed'
  url2 = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/oder/count'
  deleteId!: string;
  confirmMessage = '';
  key = '';
  size = 5;
  sizes = 5;
  page = 1;
  day=365;

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
  ngOnInit() {
    this.btnDisabled = true;
    if (this.key ==='') {
      this.rest.getOder(this.url, this.page, this.size, 'confimed').then(data => {
        this.oder3 = (data as { oder: Carts[] }).oder;
        this.btnDisabled = false;
        console.log(this.oder3);
      })
    } else {
      this.rest.searchOrder(this.url1, this.key).then(data => {
        this.oder3 = (data as { oder: Carts[] }).oder;
        this.btnDisabled = false;
      })
        .catch(error => {
          this.data.error(error['message']);
        })
    }
    this.rest.getCountDashboard(this.url2,this.day,'confimed').then(data => {
      let value = data as { count:number}
      this.count2= value.count;
      this.btnDisabled = false;
      console.log(this.count2);
      console.log(value);
    })
  }


}
