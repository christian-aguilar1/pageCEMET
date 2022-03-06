import { Component, OnInit } from '@angular/core';

import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  public news = [] as  any;
  public idDocs = [] as  any;
  public months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.getCollections('news').subscribe((snapshot) => {
      this.news = [];
      snapshot.forEach((doc) => {
        this.news.push(doc.data())
        this.idDocs.push(doc.id);
        let a = this.news[0].date.toDate()
        let date = a.getDate() + " de " + this.months[a.getMonth()] + ", " + a.getFullYear();
        this.news[0].date = date;
      })
    })
  }

}
