import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  idDoc: string = "";
  public news = {} as  any;
  image!: string;

  public months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  constructor(private firestoreService: FirestoreService, private storage: AngularFireStorage, private title: Title,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idDoc = params['id'];
    })

    this.firestoreService.getCollection('news', this.idDoc).subscribe((doc) => {
      this.news = [];
      let newsDB = doc.data() as any;
      let a = newsDB.date.toDate()
      let date = a.getDate() + " de " + this.months[a.getMonth()] + ", " + a.getFullYear();
      newsDB.date = date;
      this.news = newsDB;
      if (this.news.image !== "") {
        const fileRef = this.storage.ref(this.news.image);
        const imageRef = fileRef.getDownloadURL();
        imageRef.subscribe(url => {
          this.image = url;
        })
      }
    })
  }

}
