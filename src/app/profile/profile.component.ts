import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../models/employee';
import { DataService } from '../services/data.service';
import { RestApiService } from '../services/rest-api.service';
import { PageEvent } from '@angular/material/paginator';
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
  url = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/users'
  url1 = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/users/count'
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
    }else{
      this.key=''
      this.ngOnInit()
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
      this.rest.gets(this.url, this.page, this.size).then(data => {
        this.employee = (data as { employee: Employee[] }).employee;
        this.btnDisabled = false;
      })
        .catch(error => {
          this.data.error(error['message']);
        })
    } else {
      this.rest.search(this.url, this.key, this.size).then(data => {
        this.employee = (data as { employee: Employee[] }).employee;
        this.btnDisabled = false;
      })
        .catch(error => {
          this.data.error(error['message']);
        })
    }
    this.rest.get(this.url1).then(data => {
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
