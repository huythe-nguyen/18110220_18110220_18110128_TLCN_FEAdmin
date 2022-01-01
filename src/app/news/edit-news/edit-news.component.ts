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
     public editorData = '<figure class="image image_resized" style="margin-left:0px;width:25%;"><img src="https://bizweb.dktcdn.net/100/424/874/themes/817899/assets/calendar.svg?1640917423210" alt="calendar"></figure><p style="margin-left:0px;">17/05/2021 </p><figure class="image image_resized image-style-align-center" style="margin-left:0px;width:25%;"><img src="https://bizweb.dktcdn.net/100/424/874/themes/817899/assets/user.svg?1640917423210" alt="user"></figure><p style="margin-left:0px;">Đăng bởi: Admin tiemgiaycusaigon</p><p style="margin-left:0px;"><strong>Embossed – Dập nổi.</strong></p><p style="margin-left:0px;"> </p><p style="margin-left:0px;"> - Với đôi Ben G này thì chắc mọi người cũng đã biết qua, bởi nó vừa được released ở thời điểm gần đây thôi, là vào tháng 10 năm 2019. <strong>Nike SB Dunk low “Ben G”</strong> là một đôi giày thuộc Nike đầu tiên được dập dấu Swoosh chìm trên những phần da của đôi giày và không hề có dấu móc to đùng như thường thấy nữa, và cũng được mệnh danh là một đôi giày huyền thoại trong quá trình tạo nên nó.</p><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/2-sbdunkhistory-213921d9-da1d-49c0-821e-3b634fad9a10.jpg?v=1621227723733"></figure><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/1-sbdunkhistory.jpg?v=1621227831407"></figure><p style="margin-left:0px;"> </p><p style="margin-left:0px;">- Upper làm từ loại da cao cấp và được dập chìm đa phần trên đó, và đây là một bản collab giữa một skate shop cực kỳ iconic ở <strong>Amsterdam – “Ben G”</strong>, một sự kết hợp độc đáo giữa graphic mà họ tạo nên và lấy cảm hứng "Tennis Vibes" những năm 1980.</p><p style="margin-left:0px;"> </p><p style="margin-left:0px;"> - Nổi tiếng với những lời lẽ không mấy khiếm nhã trên sân đấu, dựa vào đó mà một chiến dịch Nike đặc trưng của McEnroe trong những năm 80s trước đây có khẩu hiệu là: “McEnroe Swears By Them” giành cho dòng giày đánh tennis. Chính vì vậy Nike SB đã biến câu khẩu hiệu đó thành châm ngôn với bản collab trên, với sự góp mặt chính của những tay trượt nổi tiếng thời đó như JB Gillet, Wieger Van Wageningen và Dani Lebron.</p><p style="margin-left:0px;"> </p><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/6.jpg?v=1621227599343"></figure><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/2-sbdunkhistory-213921d9-da1d-49c0-821e-3b634fad9a10.jpg?v=1621227723733"></figure><p style="margin-left:0px;"> - Về phần đôi giày, phần lining mang sắc Kelly green tăng độ tương phản cho sắc trắng của toàn bộ đôi giày. Insoles là hàng tá dấu Swoosh nhỏ được in một cách ngẫu nhiên, back tab được thêu branding của Ben – G. Như đã nói ở trên nó được lấy theo câu khẩu hiệu của chiến dịch giày tennis những năm 80s, nên vậy dựa vào đó họ đã làm ra một chiếc đế màu kem, tượng trưng cho sự vintage đó, cũng như là một đôi ở thế hệ sau này cụ thể là năm 2019 nhưng đế lại làm theo loại đế OG của những đôi SB ngày xưa – một khối cao su hoàn chỉnh không có phần foam dãn nở ở giữa lòng của outsole.</p><p style="margin-left:0px;"> </p><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/7.jpg?v=1621227599970"></figure><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/8.jpg?v=1621227600840"></figure><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/9.jpg?v=1621227601770"></figure><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/10.png?v=1621227602437"></figure><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/11-jpeg.jpg?v=1621227603000"></figure><figure class="image" style="margin-left:0px;"><img src="https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/12.jpg?v=1621227603553"></figure>';
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
    console.log(this.news.endDay)
    this.rest.put(this.url1,this.editId,this.news)
      .then(data =>{
        this.doing=false;
        this.updateFinished.emit('News is update')
        this.modelService.dismissAll();
        this.news = new News();
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });

  }

}
