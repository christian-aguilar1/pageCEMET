import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { New } from 'src/app/core/models/new';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {

  @Input()
  new!: New;
  @Input() idDoc!: string;
  image!: string;

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
    const fileRef = this.storage.ref(this.new.image);
    const imageRef = fileRef.getDownloadURL();
    imageRef.subscribe(url => {
      console.log(url)
      this.image = url;
    })
  }

}
