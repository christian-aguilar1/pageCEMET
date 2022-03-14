import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-documents-page',
  templateUrl: './documents-page.component.html',
  styleUrls: ['./documents-page.component.scss']
})
export class DocumentsPageComponent implements OnInit {

  public user: boolean = false;
  public documents = [] as  any;
  pdfs: Array<any> = [];
  public idDocs = [] as  any;
  categories = [] as any;

  constructor(private authService: AuthService, private firestoreService: FirestoreService, private title: Title,
              private storage: AngularFireStorage, private router: Router) {
    title.setTitle("Directiva - CEMET");
  }

  ngOnInit(): void {
    this.hasUser();
    this.firestoreService.getCollections('documents').subscribe((snapshot) => {
      this.documents = [];
      let i = 0;
      snapshot.forEach((doc) => {
        this.documents.push(doc.data())
        this.idDocs.push(doc.id);
        if (!this.categories.includes(this.documents[i].category)) {
          this.categories.push(this.documents[i].category)
        }
        if (this.documents[i] !== "") {
          const fileRef = this.storage.ref(this.documents[i].document);
          const imageRef = fileRef.getDownloadURL();
          imageRef.subscribe(url => {
            this.pdfs.push(url);
          })
        }
        i++;
      })
    })

  }

  hasUser() {
    this.authService.hasUser().
      subscribe(res => {
        if(res && res.uid) {
          this.user = true;
        }
      }
    );
  }

  deletePosition(id: any) {
    this.firestoreService.deleteCollection('documents', id)
      .then(() => {
        console.log("Document successfully deleted!");
        this.router.navigateByUrl('/', {skipLocationChange: true}).
          then(() =>
            this.router.navigate(['./documentos'])
          );
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      })
  }

}
