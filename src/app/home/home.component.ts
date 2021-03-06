import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Carts } from '../models/cart';
import { DataService } from '../services/data.service';
import { RestApiService } from '../services/rest-api.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  oder!: Carts[];
  oder1!: Carts[];
  oder2!: Carts[];
  btnDisabled = false;
  url = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/oder'
  url1 = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/oder/count'
  deleteId!: string;
  confirmMessage = '';
  key = '';
  size=10;
  lenght:number
  page=1;
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
    /*  this.rest.get(this.url).then(data=>{
       this.product =( data as {product: Product[]}).product;
       this.btnDisabled=false;
     })
     .catch(error=>{
       this.data.error(error['message']);
     }) */
    if (this.key == '') {
      this.rest.getOder(this.url, this.page, this.size, 'unconfirmed').then(data => {
        this.oder = (data as { oder: Carts[] }).oder;
        this.btnDisabled = false;
      })
      this.rest.getOder(this.url, this.page, this.size, 'cancel').then(data => {
        this.oder2 = (data as { oder: Carts[] }).oder;
        this.btnDisabled = false;
      })
    } else {
      this.rest.search(this.url, this.key,this.size).then(data => {
        this.oder = (data as { oder: Carts[] }).oder;
        this.btnDisabled = false;
      })
        .catch(error => {
          this.data.error(error['message']);
        })
    }
    this.rest.getCountDashboard(this.url1,this.day,'unconfirmed').then(data => {
      this.btnDisabled = false;
      let value = data as { count:number}
      this.lenght= value.count;
      this.btnDisabled = false;
      console.log(this.lenght);
      console.log(value);
    })
  }

}
