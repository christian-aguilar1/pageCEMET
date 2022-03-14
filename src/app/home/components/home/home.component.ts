import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';
import { GetapiService } from 'src/app/core/services/getapi/getapi.service';

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

  urlsIg: Array<string> = ['CZHiQygLHoS', 'CX3-2KMrHdF', 'CXpVmfQjz8J', 'CXEjwPQjzS7', 'CW_eLXxrgWY', 'CW9VmopDcuL',
                          'CW6LEmFJTGI', 'CWv36u1L6Tp', 'CWgl1hlP367', 'CWXRrNFsERn', 'CWLrr1ULR8l', 'CWE-EwFsBq4'];

  urlShown: number = 0;
  linkShown: any = "";

  constructor(private authService: AuthService, private firestoreService: FirestoreService, private title: Title,
              public _location: Location, public apiService: GetapiService, private sanitizer: DomSanitizer) {
      title.setTitle("CEMET - Centro de Estudiantes de Metalurgia");
    }

    ngOnInit(): void {
      this.linkShown = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.instagram.com/p/${this.urlsIg[this.urlShown]}/embed/`);
      this.hasUser();
      this.firestoreService.getCollections('news').subscribe((snapshot) => {
        this.news = [];
        snapshot.forEach((doc) => {
          this.news.push(doc.data())
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

  changeURL(id: number) {
    this.urlShown += id;
    this.linkShown = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.instagram.com/p/${this.urlsIg[this.urlShown]}/embed/`);
  }

  logout() {
    this.authService.logout()
      .then(() => {
        window.location.reload();
      });
  }

}
