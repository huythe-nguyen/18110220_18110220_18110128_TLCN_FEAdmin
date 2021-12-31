import { finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { News } from 'src/app/models/news';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  selectedFile: FileList | null;
  forma: FormGroup;
  tests: Observable<any[]>;
  saving=false;
  news: News;
  err=''
  url1='http://localhost:3000/api/v1/admin/new/add'
  @Output()
  savingFinshed: EventEmitter<string>= new EventEmitter<string>();
  public Data: string = "hello"
  public readonly: boolean = true;
  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private fs: FirebaseService,
    public dialog: MatDialog,
    private notificationService: NotificationService) {
      this.news= new News;
      setInterval(() => {
        console.log("", this.Data)
      }, 2000)
      this.forma = fb.group ({
        categoria: ['myCategoria'],
      })
     }
     infoNew = this.fb.group({
      "title":["",[Validators.required,Validators.minLength(2)]],
      "codeTitle":["",[Validators.required,Validators.minLength(2),]],
      "description":["",[Validators.required,Validators.min(3),Validators.max(50)]],
      "imgs":["", [Validators.required]],
      "starDay":["",[Validators.required]],
      "endDay":["",[Validators.required]],
      "state":["",[Validators.required]]

    })
  ngOnInit() {
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  detectFiles(event) {
    this.selectedFile = event.target.files[0];
  }
  onclose(){
    this.dialog.closeAll()
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
  save(){
    this.saving=true;
    this.news.htmlData= this.Data;
    console.log(this.news)
    this.rest.post(this.url1,this.news)
      .then(data =>{
        this.saving=false;
        // this.savingFinshed.emit('Đã thêm bài viết: ' + this.news.title)
        // this.modelService.dismissAll();
        this.ngOnInit()
        this.notificationService.success('successfully')
        this.dialog.closeAll()
      }).catch(error =>{
        this.saving =false;
        this.data.error('mã bài viết đã tồn tại')
        this.err= this.data.message
      });

  }


}
