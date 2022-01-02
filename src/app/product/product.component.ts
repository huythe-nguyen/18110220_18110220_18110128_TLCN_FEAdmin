import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  product!: Product[];
  btnDisabled = false;
  url = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/product'
  url1 = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/product/count'

  deleteId!: string;
  confirmMessage = '';
  key = '';
  size = 10;
  // sizes=10;
  page = 1;
  lenght:number
  // pages=1;
  // pageSize:number
  mess = '';
  confirmDeleteProduct(confirmDialog: TemplateRef<any>, id: string, productName: string) {
    this.confirmMessage = `Bạn thật sự muốn xóa sản phẩm ${productName}`;
    this.deleteId = id;
    this.modalService.open(confirmDialog, { ariaDescribedBy: 'modal-basic-title' }).result.then((result) => {
      this.deleteId = '';
    }, (err) => {

    })
  }
  search(keys: string) {
    if (keys !== '') {
      this.key = keys;
      this.ngOnInit();
    }else{
      this.key='';
      this.ngOnInit()
    }
  }
  // Loadpage(pages:number){
  //   console.log(pages)
  //     if(pages>0){
  //       this.page = pages;
  //       this.pages=pages
  //       this.ngOnInit()
  //     }
  // }
  // Loadsize(sizes:number){
  //   console.log(sizes)
  //   if(sizes>4){
  //     this.size=sizes;
  //     this.sizes=sizes;
  //     this.ngOnInit();
  //   }

  // }
  LoadPagesize(event: PageEvent) {
    if (event.pageSize != 0 || event.pageIndex >=0) {
      this.size = event.pageSize
      this.page = event.pageIndex + 1
      console.log(this.page)
    }
    this.ngOnInit()
  }
  constructor(private rest: RestApiService,
    private data: DataService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.btnDisabled = true;
    console.log(this.size)
    if (this.key == '') {
      this.rest.gets(this.url, this.page, this.size).then(data => {
        this.product = (data as { product: Product[] }).product;
        this.btnDisabled = false;
      })
        .catch(error => {
          this.data.error(error['message']);
        })
      this.mess = this.data.message
    } else {
      this.rest.search(this.url, this.key, this.size).then(data => {
        this.product = (data as { product: Product[] }).product;
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

  Search() {
    if (this.key == '') {
      this.ngOnInit();
    } else {
      this.product = this.product.filter(res => {
        return res.productCode.toLocaleLowerCase().match(this.key.toLocaleLowerCase())
      })
    }
  }
  finishAndAlert(message: string) {
    this.data.success(message);
    this.ngOnInit();
  }
  deleteProduct() {
    if (this.deleteId !== '') {
      this.rest.delete(this.url, this.deleteId).then(data => {
        this.modalService.dismissAll();
        this.ngOnInit();
      })
    }
  }
  exportExcel() {

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Sheet1');
    worksheet.columns = [
      { header: 'Tên Sản phẩm', key: 'productName', width: 50 },
      { header: 'Mã sản phẩm', key: 'productCode', width: 30 },
      { header: 'Thương hiệu', key: 'brand', width: 15 },
      { header: 'Size', key: 'size', width: 15 },
      { header: 'Số lượng', key: 'amount', width: 15 },
      { header: 'Giới tính', key: 'gender', width: 15 },
      { header: 'Màu', key: 'colour', width: 15 },
      { header: 'Loại hàng', key: 'status', width: 15 },
      { header: 'Giá', key: 'price', width: 15 }
    ];

    this.product.forEach(e => {
      worksheet.addRow({
        productName: e.productName, productCode: e.productCode, size: e.size, amount: e.amount,
        brand: e.brand, gender: e.gender, colour: e.colour, status: e.status, price: e.price
      }, "n");
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Product.xlsx');
    })

  }
}
