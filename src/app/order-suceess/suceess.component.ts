import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Carts } from '../models/cart';
import { DataService } from '../services/data.service';
import { RestApiService } from '../services/rest-api.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-suceess',
  templateUrl: './suceess.component.html',
  styleUrls: ['./suceess.component.scss']
})
export class SuceessComponent implements OnInit {
  sideBarOpen = true;
  title = 'angular-app';
  fileName= 'ExcelSheet.xlsx';
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  oder!: Carts[];
  oder1!: Carts[];
  oder2!: Carts[];
  btnDisabled = false;
  url = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/oder/dashboard'
  url2 = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/oder/delivery'
  url1='https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/oder?state=success'
  url3 = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/oder/count'
  deleteId!: string;
  confirmMessage = '';
  key = '';
  size=10;
  lenght:number
  page=1;
  day=0;
  days=0
  daystart:Date
  dayend: Date
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
    if (days > -1) {
      this.day = days;
      this.days = days;
      this.ngOnInit()
    }
  }
  Loadday1() {
    this.ngOnInit()
  }
  ngOnInit() {
    this.btnDisabled = true;
    if (this.key ==='') {
      if(this.daystart&&this.dayend){
        this.rest.getdelivery(this.url2, this.page, this.size, this.daystart, this.dayend, 'success').then(data => {
          this.oder2 = (data as { oder: Carts[] }).oder;
          this.btnDisabled = false;
          console.log(this.oder2);
        })
      }else{
        this.rest.getDashboard(this.url, this.page, this.size, this.day, 'success').then(data => {
          this.oder2 = (data as { oder: Carts[] }).oder;
          this.btnDisabled = false;
          console.log(this.oder2);
        })
      }
    } else {
      this.rest.searchOrder(this.url1, this.key).then(data => {
        this.oder2 = (data as { oder: Carts[] }).oder;
        this.btnDisabled = false;
      })
        .catch(error => {
          this.data.error(error['message']);
        })
    }
    this.rest.getCountDashboard(this.url3,this.day,'success').then(data => {
      let value = data as { count:number}
      this.lenght= value.count;
      this.btnDisabled = false;
      console.log(this.lenght);
      console.log(value);
    })
  }
  exportExcel() {

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Sheet1');
    worksheet.columns = [
      { header: 'Họ và Tên', key: 'displayName', width: 25 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Địa chỉ', key: 'address', width: 40 },
      { header: 'Mã Giỏ hàng', key: 'codeOder', width: 15 },
      { header: 'Ngày mua hàng', key: 'timeOrder', width: 15 },
      { header: 'Tổng tiền', key: 'total', width: 15 },
      { header: 'Ghi chú', key: 'note', width: 40},
    ];

    this.oder2.forEach(e => {
      worksheet.addRow({ displayName: e.displayName,email: e.email, phone:e.phone,
         address: e.address + ","+e.country+","+e.city,codeOder:e.codeOder, total:e.total, note:e.note },"n");
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'OderSuccess.xlsx');
    })

  }

}
