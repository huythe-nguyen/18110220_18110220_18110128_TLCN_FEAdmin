import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Carts } from '../models/cart';
import { DataService } from '../services/data.service';
import { RestApiService } from '../services/rest-api.service';

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
  url = 'http://localhost:3000/api/v1/admin/oder'
  deleteId!: string;
  confirmMessage = '';
  key = '';
  size = 5;
  sizes = 5;
  page = 1;
  pages = 1;

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
  Loadpage(pages: number) {
    console.log(pages)
    if (pages > 0) {
      this.page = pages;
      this.pages = pages
      this.ngOnInit()
    }
  }
  Loadsize(sizes:number){
    console.log(sizes)
    if(sizes>4){
      this.size=sizes;
      this.sizes=sizes;
      this.ngOnInit();
    }
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
      this.rest.search(this.url, this.key).then(data => {
        this.oder = (data as { oder: Carts[] }).oder;
        this.btnDisabled = false;
      })
        .catch(error => {
          this.data.error(error['message']);
        })
    }
  }

}
