import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public news = [] as  any;
  public user: boolean = false;
  public idDocs = [] as  any;
  public posts: Array<string> = [];

  urlsIg: Array<string> = []

  urlShown: number = 0;
  linkShown: any = "";

  constructor(private authService: AuthService, private firestoreService: FirestoreService, private title: Title,
              public _location: Location) {
      title.setTitle("CEMET - Centro de Estudiantes de Metalurgia");
    }

    ngOnInit(): void {
     this.hasUser();
      this.firestoreService.getCollections('news').subscribe((snapshot) => {
        this.news = [];
        snapshot.forEach((doc) => {
          // let newsDB = doc.data() as any;
          this.news.push(doc.data())
          this.idDocs.push(doc.id);
        })
        this.news.sort((a: any, b: any) => b.date - a.date)
        this.idDocs.sort((a: any, b: any) => b.date - a.date)
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

  changeURL(id: number) {
    this.urlShown += id;
  }

  logout() {
    this.authService.logout()
      .then(() => {
        window.location.reload();
      });
  }

}
