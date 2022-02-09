import { Component, Input, OnInit } from '@angular/core';
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

  // image: string = this;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.hasUser();
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
