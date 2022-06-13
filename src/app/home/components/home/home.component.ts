import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public news = [] as any;
  public user: boolean = false;
  public idDocs = [] as any;
  public posts: Array<string> = [];

  urlsIg: Array<string> = [
    'CeUaxABDhmj',
    'CdzARB0OHW6',
    'CdpBzotMjhK',
    'Cdo3KhTs2Qi',
    'Cdgo5EBOOWC',
    'CdZJo7lrwAz',
    'CdUc_mRMdP9',
    'CdABwnVslT_',
    'Cb8PwyejVb-',
    'CbsRAHIr3Qs',
    'CZHiQygLHoS',
    'CX3-2KMrHdF',
    'CXpVmfQjz8J',
    'CXEjwPQjzS7',
    'CW_eLXxrgWY',
    'CW9VmopDcuL',
    'CW6LEmFJTGI',
    'CWv36u1L6Tp',
    'CWgl1hlP367',
    'CWXRrNFsERn',
    'CWLrr1ULR8l',
    'CWE-EwFsBq4',
  ];

  urlShown: number = 0;
  linkShown: any = '';

  collection$!: Subscription;
  user$!: Subscription;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private title: Title,
    public _location: Location,
    private sanitizer: DomSanitizer
  ) {
    this.title.setTitle('CEMET - Centro de Estudiantes de Metalurgia');
  }

  ngOnInit(): void {
    this.linkShown = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.instagram.com/p/${this.urlsIg[this.urlShown]}/embed/`
    );
    this.hasUser();
    this.collection$ = this.firestoreService.getCollections('news').subscribe((snapshot) => {
      this.news = [];
      snapshot.forEach((doc) => {
        // let newsDB = doc.data() as any;
        let newsDB = doc.data() as any;
        this.news.push(doc.data());
        this.idDocs.push({
          id: doc.id,
          date: newsDB.date,
        });
      });
      this.news.sort((a: any, b: any) => b.date - a.date);
      this.idDocs.sort((a: any, b: any) => b.date - a.date);
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

  changeURL(id: number) {
    this.urlShown += id;
    this.linkShown = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.instagram.com/p/${this.urlsIg[this.urlShown]}/embed/`
    );
  }

  logout() {
    this.authService.logout().then(() => {
      window.location.reload();
    });
  }
}
