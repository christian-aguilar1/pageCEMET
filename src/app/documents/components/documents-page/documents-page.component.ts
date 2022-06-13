import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-documents-page',
  templateUrl: './documents-page.component.html',
  styleUrls: ['./documents-page.component.scss'],
})
export class DocumentsPageComponent implements OnInit, OnDestroy {
  public user: boolean = false;
  public documents = [] as any;
  pdfs: Array<any> = [];
  public idDocs = [] as any;
  categories = [] as any;

  collection$!: Subscription;
  user$!: Subscription;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private title: Title,
    private storage: AngularFireStorage,
    private router: Router
  ) {
    this.title.setTitle('Directiva - CEMET');
  }

  ngOnInit(): void {
    this.hasUser();
    this.collection$ = this.firestoreService.getCollections('documents').subscribe((snapshot) => {
      this.documents = [];
      snapshot.forEach((doc) => {
        let data = doc.data() as any;
        this.documents.push({
          id: doc.id,
          data: doc.data(),
        });
        if (!this.categories.includes(data.category)) {
          this.categories.push(data.category);
        }
        const fileRef = this.storage.ref(data.document);
        const imageRef = fileRef.getDownloadURL();
        imageRef.subscribe((url) => {
          this.pdfs.push({
            id: doc.id,
            url: url,
          });
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.collection$) this.collection$.unsubscribe();
    if (this.user$) this.user$.unsubscribe();
  }

  hasUser() {
    this.user$ = this.authService.hasUser().subscribe((res) => {
      if (res && res.uid) {
        this.user = true;
      }
    });
  }

  deletePosition(id: any) {
    this.firestoreService
      .deleteCollection('documents', id)
      .then(() => {
        console.log('Document successfully deleted!');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['./documentos']));
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }
}
