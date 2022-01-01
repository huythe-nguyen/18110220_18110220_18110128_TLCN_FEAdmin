import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { News } from '../models/news';
import { MatDialog } from '@angular/material/dialog';
import { AddNewsComponent } from './add-news/add-news.component';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { EditNewsComponent } from './edit-news/edit-news.component';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  sideBarOpen = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  news!: News[];
  new: News
  btnDisabled = false;
  url = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/new'
  url1 = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/new/count'
  deleteId!: string;
  confirmMessage = '';
  key = '';
  size=10;
  lenght:number
  page=1;
  mess = ''
  // pages=1;
  confirmDeleteNew(confirmDialog: TemplateRef<any>, id: string, title: string) {
    this.confirmMessage = `Bạn thật sự muốn xóa bài viết ${title}`;
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
    private modalService: NgbModal,
    public dialog: MatDialog) {
    this.new = new News

  }
  openDialog(){
    this.dialog.open(AddNewsComponent,{height: '600px',
    width: '600px'})
    this.ngOnInit()
  }
  openDialogEdit(id:string){
    this.dialog.open(EditNewsComponent,{height: '600px',
    width: '600px'})
    this.ngOnInit()
  }
  ngOnInit() {
    this.btnDisabled = true;
    if (this.key == '') {
      this.rest.gets(this.url,this.page,this.size).then(data => {
        this.news = (data as { news: News[] }).news;
        this.btnDisabled = false;
        this.mess = this.data.message
      })
        .catch(error => {
          this.data.error(error['message']);
        })
    } else {
      this.rest.search(this.url, this.key,this.size).then(data => {
        this.news = (data as { news: News[] }).news;
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
      this.news = this.news.filter(res => {
        return res.codeTitle.toLocaleLowerCase().match(this.key.toLocaleLowerCase())
      })
    }
  }
  delete() {
    if (this.deleteId !== '') {
      this.rest.delete(this.url, this.deleteId).then(data => {
        this.modalService.dismissAll();
        this.ngOnInit();
      })
        .catch(error => {
          this.data.error(error['message']);
        })
    }
  }
  finishAndAlert(message: string) {
    this.data.success(message);
    this.ngOnInit();
  }
}
