import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth/auth.service';

import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit, OnDestroy {
  public news = [] as any;
  public thereNews = false;
  public dates = [] as any;
  public idDocs = [] as any;
  public user: boolean = false;
  public months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  user$!: Subscription;
  news$!: Subscription;

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private authService: AuthService,
    private title: Title
  ) {
    this.title.setTitle('Noticias - CEMET');
  }

  ngOnInit(): void {
    this.hasUser();
    this.news$ = this.firestoreService.getCollections('news').subscribe((snapshot) => {
      this.news = [];
      snapshot.forEach((doc) => {
        let newsDB = doc.data() as any;
        this.news.push(newsDB);
        let a = newsDB.date.toDate();
        let date = a.getDate() + ' de ' + this.months[a.getMonth()] + ', ' + a.getFullYear();
        this.dates.push({
          stringDate: date,
          date: newsDB.date,
        });
        this.idDocs.push({
          id: doc.id,
          date: newsDB.date,
        });
      });
      this.news.sort((a: any, b: any) => b.date - a.date);
      this.dates.sort((a: any, b: any) => b.date - a.date);
      this.idDocs.sort((a: any, b: any) => b.date - a.date);

      this.news.length > 0 ? (this.thereNews = true) : (this.thereNews = false);
    });
  }

  ngOnDestroy(): void {
    if (this.news$) this.news$.unsubscribe();
    if (this.user$) this.user$.unsubscribe();
  }

  hasUser() {
    this.user$ = this.authService.hasUser().subscribe((res) => {
      if (res && res.uid) {
        this.user = true;
      }
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }
}
