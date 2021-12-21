import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Carts } from '../models/cart';
import { DataService } from '../services/data.service';
import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  oder!: Carts[];
  oder1!: Carts[];
  oder2!: Carts[];
  btnDisabled = false;
  url = 'http://localhost:3000/api/v1/admin/oder'
  url1='http://localhost:3000/api/v1/admin/oder?state=cancel'
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
    if (this.key ==='') {
      this.rest.getOder(this.url, this.page, this.size, 'cancel').then(data => {
        this.oder2 = (data as { oder: Carts[] }).oder;
        this.btnDisabled = false;
        console.log(this.oder2);
      })
    } else {
      this.rest.searchOrder(this.url1, this.key).then(data => {
        this.oder2 = (data as { oder: Carts[] }).oder;
        this.btnDisabled = false;
      })
        .catch(error => {
          this.data.error(error['message']);
        })
    }
  }

}
