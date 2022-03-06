import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { AuthService } from 'src/app/core/services/auth/auth.service';

import { New } from '../../../core/models/new';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {

  public user: boolean = false;

  @Input()
  new!: New;
  @Input() idDoc!: string;
  image!: string;

  // image: string = this;

  constructor(private authService: AuthService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.hasUser();
    const fileRef = this.storage.ref(this.new.image);
    const imageRef = fileRef.getDownloadURL();
    imageRef.subscribe(url => {
      this.image = url;
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

}
