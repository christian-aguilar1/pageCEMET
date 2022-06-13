import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: boolean = false;
  isShown: boolean = false;

  sub$!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.hasUser();
  }

  ngOnDestroy(): void {
    if (this.sub$) this.sub$.unsubscribe();
  }

  hasUser() {
    this.sub$ = this.authService.hasUser().subscribe((res) => {
      if (res && res.uid) {
        this.user = true;
      }
    });
  }
}
