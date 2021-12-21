import { Component, OnInit, ViewChild  } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

export interface Test {
  imagenDestacada: string;
}
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styles: []
})
export class ImageComponent implements OnInit {


  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  selectedFile: FileList | null;
  forma: FormGroup;
  tests: Observable<any[]>;

  constructor(fb: FormBuilder, private storage: AngularFireStorage, private afs: AngularFirestore, private fs: FirebaseService ) {
    this.forma = fb.group ({
      categoria: ['myCategoria'],

    })
  }

  ngOnInit() {
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

  mostrarImagenes() {
    this.tests = this.fs.getTests();
  }

}
