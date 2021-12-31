import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { Brand } from '../models/brand';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  brands!: Brand[];
  btnDisabled= false;
  url='http://localhost:3000/api/v1/admin/brand'
  url1='http://localhost:3000/api/v1/admin/brand/count'
  deleteId!:string;
  confirmMessage='';
  key='';
  size=10;
  lenght:number
  page=1;
  mess='';
  confirmDeleteBrand(confirmDialog: TemplateRef<any>, id: string, nameBrand: string){
    this.confirmMessage = `Bạn thật sự muốn xóa thương hiệu ${nameBrand}` ;
    this.deleteId =id;
    this.modalService.open(confirmDialog, {ariaDescribedBy: 'modal-basic-title'}).result.then((result)=>{
      this.deleteId='';
    },(err)=>{

    })
  }
  search(keys: string){
    if (keys!==''){
      this.key=keys;
      this.ngOnInit();
    }
  }

  constructor(private rest:RestApiService,
    private data: DataService,
    private modalService: NgbModal) {
     }
    //  Loadpage(pages:number){
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
  ngOnInit() {
    this.btnDisabled=true;
    if(this.key==''){
    this.rest.gets(this.url,this.page,this.size).then(data=>{
        this.brands =( data as {brands: Brand[]}).brands;
        this.btnDisabled=false;

      })
      .catch(error=>{
        this.data.error(error['message']);
        this.btnDisabled=false;
      })
      this.mess=this.data.message
      // const types=this.data.messageType
      // console.log(this.data.message)
      // console.log(this.data.messageType)
    }else{
      this.rest.search(this.url,this.key, this.size).then(data=>{
        this.brands =( data as {brands: Brand[]}).brands;
        this.btnDisabled=false;
      })
      .catch(error=>{
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
  Search(){
    if(this.key==''){
      this.ngOnInit();
    }else{
      this.brands = this.brands.filter(res=>{
        return res.nameBrand.toLocaleLowerCase().match(this.key.toLocaleLowerCase())
      })
    }
  }
  delete(){
    if (this.deleteId!==''){
      this.rest.delete(this.url,this.deleteId).then(data =>{
        this.modalService.dismissAll();
        this.ngOnInit();
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
    }
  }

  finishAndAlert( message: string){
    this.data.success(message);
    this.ngOnInit();
  }

}
