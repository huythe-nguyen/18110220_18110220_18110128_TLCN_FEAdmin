import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Carts } from '../models/cart';
import { DataService } from '../services/data.service';
import { RestApiService } from '../services/rest-api.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  cart!: Carts[];
  btnDisabled = false;
  url = 'http://localhost:3000/api/v1/admin/cart/confimed'
  url1 = 'http://localhost:3000/api/v1/admin/cart'
  url2 = 'http://localhost:3000/api/v1/admin/cart/count'
  deleteId!: string;
  confirmMessage = '';
  key = '';
  size=10;
  lenght:number
  page=1;
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
    if (this.key == '') {
      this.rest.gets(this.url, this.page, this.size).then(data => {
        this.cart = (data as { cart: Carts[] }).cart;
        this.btnDisabled = false;
      })
        .catch(error => {
          this.data.error(error['message']);
        })
    } else {
      this.rest.search(this.url1, this.key,this.size).then(data => {
        this.cart = (data as { cart: Carts[] }).cart;
        this.btnDisabled = false;
      })
        .catch(error => {
          this.data.error(error['message']);
        })
    }
    this.rest.get(this.url2).then(data => {
      let value = data as { counts: number}
      this.lenght= value.counts
      console.log(value.counts)
      this.btnDisabled = false;
    })
      .catch(error => {
        this.data.error(error['message']);
      })
  }

}
