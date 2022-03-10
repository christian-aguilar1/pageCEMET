import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  public news = [] as  any;
  public idDocs = [] as  any;
  public user: boolean = false;
  public months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  constructor(private firestoreService: FirestoreService, private router: Router, private authService: AuthService, 
              private title: Title) {
    title.setTitle("Noticias - CEMET")
  }

  ngOnInit(): void {
    this.hasUser();
    this.firestoreService.getCollections('news').subscribe((snapshot) => {
      this.news = [];
      snapshot.forEach((doc) => {
        let newsDB = doc.data() as any;
        let a = newsDB.date.toDate()
        let date = a.getDate() + " de " + this.months[a.getMonth()] + ", " + a.getFullYear();
        newsDB.date = date;
        this.news.push(newsDB)
        this.idDocs.push(doc.id);
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

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/home']);
      });
  }

}
