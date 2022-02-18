import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public news = [] as  any;
  public user: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.hasUser();
    this.news.push({
      id: 1,
      title: 'Test',
      image: '/assets/images/noticia.png',
      date: 1000,
      description: 'El mundo de la innovacion y el emprendimiento cada vez es mas conocido y admirado te invitamos'
    },
    {
      id: 1,
      title: 'Test',
      image: '/assets/images/noticia.png',
      date: 1000,
      description: 'El mundo de la innovacion y el emprendimiento cada vez es mas conocido y admirado te invitamos'
    },
    {
      id: 1,
      title: 'Test',
      image: '/assets/images/noticia.png',
      date: 1000,
      description: 'El mundo de la innovacion y el emprendimiento cada vez es mas conocido y admirado te invitamos'
    },
    {
      id: 1,
      title: 'Test',
      image: '/assets/images/noticia.png',
      date: 1000,
      description: 'El mundo de la innovacion y el emprendimiento cada vez es mas conocido y admirado te invitamos'
    },
    {
      id: 1,
      title: 'Test',
      image: '/assets/images/noticia.png',
      date: 1000,
      description: 'El mundo de la innovacion y el emprendimiento cada vez es mas conocido y admirado te invitamos'
    },
    {
      id: 1,
      title: 'Test',
      image: '/assets/images/noticia.png',
      date: 1000,
      description: 'El mundo de la innovacion y el emprendimiento cada vez es mas conocido y admirado te invitamos'
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
