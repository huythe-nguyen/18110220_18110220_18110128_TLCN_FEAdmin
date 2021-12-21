import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../models/employee';
import { DataService } from '../services/data.service';
import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-profile',
  templateUrl:'./profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  employee!: Employee[];
  btnDisabled = false;
  url = 'http://localhost:3000/api/v1/users'
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
      this.rest.gets(this.url, this.page, this.size).then(data => {
        this.employee = (data as { employee: Employee[] }).employee;
        this.btnDisabled = false;
      })
        .catch(error => {
          this.data.error(error['message']);
        })
    } else {
      this.rest.search(this.url, this.key).then(data => {
        this.employee = (data as { employee: Employee[] }).employee;
        this.btnDisabled = false;
      })
        .catch(error => {
          this.data.error(error['message']);
        })
    }
  }
  
}
