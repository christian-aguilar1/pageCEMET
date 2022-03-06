import { Component, OnInit } from '@angular/core';

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

  constructor(private authService: AuthService, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
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

  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }

}
