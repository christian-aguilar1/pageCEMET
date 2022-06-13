import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

import { New } from '../../../core/models/new';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit, OnDestroy {
  public user: boolean = false;

  @Input()
  new!: New;
  @Input() idDoc!: any;
  @Input()
  date!: any;
  image!: string;
  body: string = '';

  user$!: Subscription;
  image$!: Subscription;

  // image: string = this;

  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.hasUser();
    const fileRef = this.storage.ref(this.new.image);
    const imageRef = fileRef.getDownloadURL();
    this.image$ = imageRef.subscribe((url) => {
      this.image = url;
    });
    this.body = this.new.body.substring(0, 300);
    this.body += '...';
  }

  ngOnDestroy(): void {
    if (this.user$) this.user$.unsubscribe();
    if (this.image$) this.image$.unsubscribe();
  }

  hasUser() {
    this.user$ = this.authService.hasUser().subscribe((res) => {
      if (res && res.uid) {
        this.user = true;
      }
    });
  }

  deleteNew() {
    // console.log(this.idDoc)
    this.firestoreService
      .deleteCollection('news', this.idDoc)
      .then(() => {
        console.log('Document successfully deleted!');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }
}
