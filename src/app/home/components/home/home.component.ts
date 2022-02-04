import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public news = [] as  any;

  constructor() { }

  ngOnInit(): void {
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



  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }

}
