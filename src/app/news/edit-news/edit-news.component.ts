import { MessageComponent } from './../../message/message.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { News } from 'src/app/models/news';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {


  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  selectedFile: FileList | null;
  forma: FormGroup;
  tests: Observable<any[]>;
  doing=false;
  news: News;
  url1='https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/new/edit'
  @Input("id")
  editId!: string;
  err=''
  htmlFormat=''
  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();
  public Data: string = "hello"
  public readonly: boolean = true;
  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private fs: FirebaseService,) {
      this.news= new News;
      setInterval(() => {
        console.log("", this.news.htmlData)
      }, 2000)
      this.forma = fb.group ({
        categoria: ['myCategoria'],
      })
     }
     public editorData = '<figure class="image image_resized" style="margin-left:0px;width:25%;"><img src="https://bizweb.dktcdn.net/100/424/874/themes/817899/assets/calendar.svg?1640917423210" alt="calendar"></figure><p style="margin-left:0px;">17/05/2021??</p><figure class="image image_resized image-style-align-center" style="margin-left:0px;width:25%;"><img src="https://bizweb.dktcdn.net/100/424/874/themes/817899/assets/user.svg?1640917423210" alt="user"></figure><p style="margin-left:0px;">????ng b???i: Admin tiemgiaycusaigon</p><p style="margin-left:0px;"><strong>Embossed ??? D???p n???i.</strong></p><p style="margin-left:0px;">??</p><p style="margin-left:0px;">??- V???i ????i Ben G n??y th?? ch???c m???i ng?????i c??ng ???? bi???t qua, b???i n?? v???a?????????c released ??? th???i ??i???m g???n ????y th??i, l?? v??o th??ng 10 n??m 2019. <strong>Nike SB Dunk low ???Ben G???</strong> l?? m???t ????i gi??y thu???c Nike ?????u ti??n ???????c d???p d???u Swoosh ch??m tr??n nh???ng ph???n da c???a ????i gi??y v?? kh??ng h??? c?? d???u m??c to ????ng nh?? th?????ng th???y n???a, v?? c??ng ???????c m???nh danh l?? m???t ????i gi??y huy???n tho???i trong qu?? tr??nh t???o n??n n??.</p><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/2-sbdunkhistory-213921d9-da1d-49c0-821e-3b634fad9a10.jpg?v=1621227723733"></figure><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/1-sbdunkhistory.jpg?v=1621227831407"></figure><p style="margin-left:0px;">??</p><p style="margin-left:0px;">- Upper l??m t?????lo???i da cao c???p v?? ???????c d???p ch??m ??a ph???n tr??n ????, v?? ????y l?? m???t b???n collab gi???a m???t skate shop c???c k??? iconic ??? <strong>Amsterdam ??? ???Ben G???</strong>, m???t s??? k???t h???p ?????c ????o gi???a graphic m?? h??? t???o n??n v?? l???y c???m h???ng "Tennis Vibes" nh???ng n??m 1980.</p><p style="margin-left:0px;">??</p><p style="margin-left:0px;">??- N???i ti???ng v???i nh???ng l???i l??? kh??ng m???y khi???m nh?? tr??n s??n ?????u, d???a v??o ???? m?? m???t chi???n d???ch Nike ?????c tr??ng c???a McEnroe trong nh???ng n??m 80s tr?????c ????y c?? kh???u hi???u l??: ???McEnroe Swears By Them??? gi??nh cho d??ng gi??y ????nh tennis. Ch??nh v?? v???y Nike SB ???? bi???n c??u kh???u hi???u ???? th??nh ch??m ng??n v???i b???n collab tr??n, v???i s??? g??p m???t ch??nh c???a nh???ng tay tr?????t n???i ti???ng th???i ??????nh?? JB Gillet, Wieger Van Wageningen v?? Dani Lebron.</p><p style="margin-left:0px;">??</p><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/6.jpg?v=1621227599343"></figure><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/2-sbdunkhistory-213921d9-da1d-49c0-821e-3b634fad9a10.jpg?v=1621227723733"></figure><p style="margin-left:0px;">??- V??? ph???n ????i gi??y, ph???n lining mang s???c Kelly green t??ng ????? t????ng ph???n cho s???c tr???ng c???a to??n b??? ????i gi??y. Insoles l?? h??ng t?? d???u Swoosh nh??? ???????c in m???t c??ch ng???u nhi??n, back tab ???????c th??u branding c???a Ben ??? G. Nh?? ???? n??i ??? tr??n n?? ???????c l???y theo c??u kh???u hi???u c???a chi???n d???ch gi??y tennis nh???ng n??m 80s, n??n v???y d???a v??o ???? h??? ???? l??m ra m???t chi???c ????? m??u kem, t?????ng tr??ng cho s??? vintage ????, c??ng nh?? l?? m???t ????i ??? th??? h??? sau n??y c??? th??? l?? n??m 2019 nh??ng ????? l???i l??m theo lo???i ????? OG c???a nh???ng ????i SB ng??y x??a ??? m???t kh???i cao su ho??n ch???nh kh??ng c?? ph???n foam d??n n??? ??? gi???a l??ng c???a outsole.</p><p style="margin-left:0px;">??</p><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/7.jpg?v=1621227599970"></figure><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/8.jpg?v=1621227600840"></figure><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/9.jpg?v=1621227601770"></figure><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/10.png?v=1621227602437"></figure><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/11-jpeg.jpg?v=1621227603000"></figure><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/12.jpg?v=1621227603553"></figure>';
     infoNew = this.fb.group({
      "title":["",[Validators.required,Validators.minLength(2)]],
      "codeTitle":["",[Validators.required,Validators.minLength(2),]],
      "description":["",[Validators.required,Validators.min(3),Validators.max(50)]],
      "imgs":[""],
      "starDay":[""],
      "endDay":[""],
      "state":["",[Validators.required]],
    })
  ngOnInit() {
    this.doing=true;
    this.rest.getOne(this.url1,this.editId)
      .then(data =>{
        this.doing=false;
        this.news =(data as {news: News}).news;
        this.htmlFormat= this.news.htmlData.split('&lt;').join('<');
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  detectFiles(event) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    const myTest = this.afs.collection('test').ref.doc();
    console.log(myTest.id)

    const file = this.selectedFile
    const filePath = `${myTest.id}/name1`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().toPromise().then( (url) => {
          this.downloadURL = url;
          this.news.imgs = url;
          myTest.set({
            categoria: this.forma.value.categoria,
            imagenes : this.downloadURL,
            myId : myTest.id
          })

          console.log( this.downloadURL )
        }).catch(err=> { console.log(err) });
      })
    )
    .subscribe()
  }
  update(){
    this.doing=true;
    this.news.htmlData=this.htmlFormat
    this.rest.put(this.url1,this.editId,this.news)
      .then(data =>{
        this.doing=false;
        this.updateFinished.emit('successfully')
        this.modelService.dismissAll();
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });

  }

}
