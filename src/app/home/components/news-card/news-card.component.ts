import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

import { New } from '../../../core/models/new';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {

  public user: boolean = false;

  @Input()
  new!: New;
  @Input() idDoc!: any;
  image!: string;
  body: string = "";

  // image: string = this;

  constructor(private authService: AuthService, private storage: AngularFireStorage, private router: Router,
              private firestoreService: FirestoreService,) { }

  ngOnInit(): void {
    this.hasUser();
    const fileRef = this.storage.ref(this.new.image);
    const imageRef = fileRef.getDownloadURL();
    imageRef.subscribe(url => {
      this.image = url;
    })
    this.body = this.new.body.substring(0, 300);
    this.body += "...";
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

  deleteNew() {
    console.log(this.idDoc)
    this.firestoreService.deleteCollection('news', this.idDoc)
      .then(() => {
        console.log("Document successfully deleted!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      })
  }

}
