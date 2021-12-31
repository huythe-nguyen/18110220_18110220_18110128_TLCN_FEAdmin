import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reviews } from '../models/review';
import { DataService } from '../services/data.service';
import { RestApiService } from '../services/rest-api.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  review!: Reviews[];
  btnDisabled = false;
  url = 'http://localhost:3000/api/v1/admin/product/review/state'
  url1 = 'http://localhost:3000/api/v1/admin/product/review/count'
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
    /*  this.rest.get(this.url).then(data=>{
       this.product =( data as {product: Product[]}).product;
       this.btnDisabled=false;
     })
     .catch(error=>{
       this.data.error(error['message']);
     }) */

      this.rest.gets(this.url, this.page, this.size).then(data => {
        this.review = (data as { data: Reviews[] }).data;
        this.btnDisabled = false;
      })
    this.rest.get(this.url1).then(data => {
      let value = data as { counts:number}
      this.lenght= value.counts;
      this.btnDisabled = false;
      console.log(this.lenght);
      console.log(value);
    })
  }

}
