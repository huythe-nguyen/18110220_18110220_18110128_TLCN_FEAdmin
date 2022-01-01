import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { Brand } from 'src/app/models/brand';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection} from "@angular/fire/firestore";
import {  AngularFirestore} from "@angular/fire/firestore";
import { LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseService } from 'src/app/services/firebase.service';
import { finalize } from "rxjs/operators";

export interface Test {
  imagenDestacada: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  downloadURL2: Observable<string>;
  downloadURL3: Observable<string>;
  selectedFile: FileList | null;
  forma: FormGroup;
  tests: Observable<any[]>;
  saving=false;
  product: Product;
  url1='https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/product/add'
  messerr=''
  mess:string
  brands!: Brand[];
  btnDisabled= false;
  url2='https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/brand/list'
  @Output()
  savingFinshed: EventEmitter<string>= new EventEmitter<string>();
  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private fs: FirebaseService){
      this.product= new Product;
      this.forma = fb.group ({
        categoria: ['myCategoria'],
      })
     }


  infoproduct = this.fb.group({
    "productName":["",[Validators.required,Validators.minLength(2)]],
    "productCode":["",[Validators.required,Validators.minLength(2),]],
    "size":["",[Validators.required,Validators.min(3),Validators.max(50)]],
    "amount":["",[Validators.required,Validators.min(1)]],
    "price":["",[Validators.required,Validators.min(10000)]],
    "brand":["",[Validators.required]],
    "gender":["",[Validators.required]],
    "colour":["",[Validators.required]],
    "status":["",[Validators.required]],
    "selling":["",[Validators.required]],
    "priceSale":["",[Validators.required]],
    "productImg1":["", ],
    "productImg2":["",],
    "productImg3":["",],
    "description":["",[Validators.required]]
   })

ngOnInit() {
  this.btnDisabled=true;
  this.rest.get(this.url2).then(data=>{
      this.brands =( data as {brands: Brand[]}).brands;
      this.btnDisabled=false;
    })
    .catch(error=>{
      this.data.error(error['message']);
    })

}

  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  save(){
    this.saving=true;
    this.rest.post(this.url1,this.product)
      .then(data =>{
        this.saving=false;
        this.savingFinshed.emit('Đã thêm sản phẩm ' + this.product.productName)
        this.modelService.dismissAll();
        this.ngOnInit();
      }).catch(error =>{
        this.saving =false;
        this.data.error('Mã thương hiệu đã tồn tại')
        this.messerr= this.data.message
      });
      this.mostrarImagenes();
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
          this.product.productImg1 = url;
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
  uploadFile2() {
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
          this.downloadURL2 = url;
          this.product.productImg2=url
          myTest.set({
            categoria: this.forma.value.categoria,
            imagenes : this.downloadURL2,
            myId : myTest.id
          })

          console.log( this.downloadURL2 )
        }).catch(err=> { console.log(err) });
      })
    )
    .subscribe()
  }
  uploadFile3() {
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
          this.downloadURL3 = url;
          this.product.productImg3=url
          myTest.set({
            categoria: this.forma.value.categoria,
            imagenes : this.downloadURL3,
            myId : myTest.id
          })

          console.log( this.downloadURL3 )
        }).catch(err=> { console.log(err) });
      })
    )
    .subscribe()
  }


  mostrarImagenes() {
    this.tests = this.fs.getTests();
  }

}
