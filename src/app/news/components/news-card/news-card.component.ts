import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Subscription } from 'rxjs';

import { New } from 'src/app/core/models/new';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit, OnDestroy {
  @Input()
  new!: New;
  @Input()
  date!: any;
  @Input() idDoc!: any;
  image!: string;
  body: string = '';

  image$!: Subscription;

  constructor(private storage: AngularFireStorage) {}

  ngOnInit(): void {
    const fileRef = this.storage.ref(this.new.image);
    const imageRef = fileRef.getDownloadURL();
    this.image$ = imageRef.subscribe((url) => {
      this.image = url;
    });
    this.body = this.new.body.substring(0, 500);
  }

  ngOnDestroy(): void {
    if (this.image$) this.image$.unsubscribe();
  }
}
