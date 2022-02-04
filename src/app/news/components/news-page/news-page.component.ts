import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  public news = [] as  any;

  constructor() { }

  ngOnInit(): void {
    this.news.push({
      id: 1,
      title: 'Test',
      image: '/assets/images/noticia.png',
      date: 'Enero 14, 2021',
      description: 'El mundo de la innovacion y el emprendimiento cada vez es mas conocido y admirado te invitamos'
    },
    {
      id: 1,
      title: 'Test',
      image: '/assets/images/noticia.png',
      date: 'Enero 14, 2021',
      description: 'El mundo de la innovacion y el emprendimiento cada vez es mas conocido y admirado te invitamos'
    },
    {
      id: 1,
      title: 'Test',
      image: '/assets/images/noticia.png',
      date: 'Enero 14, 2021',
      description: 'El mundo de la innovacion y el emprendimiento cada vez es mas conocido y admirado te invitamos'
    },
    {
      id: 1,
      title: 'Test',
      image: '/assets/images/noticia.png',
      date: 'Enero 14, 2021',
      description: 'El mundo de la innovacion y el emprendimiento cada vez es mas conocido y admirado te invitamos'
    },
    {
      id: 1,
      title: 'Test',
      image: '/assets/images/noticia.png',
      date: 'Enero 14, 2021',
      description: 'El mundo de la innovacion y el emprendimiento cada vez es mas conocido y admirado te invitamos'
    },
    {
      id: 1,
      title: 'Test',
      image: '/assets/images/noticia.png',
      date: 'Enero 14, 2021',
      description: 'El mundo de la innovacion y el emprendimiento cada vez es mas conocido y admirado te invitamos'
    })
  }

}
