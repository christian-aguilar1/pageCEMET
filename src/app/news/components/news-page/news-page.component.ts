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
      image: '/assets/images/logo-cemet1.jpeg',
      price: 1000,
      description: 'test'
    },
    {
      id: 1,
      title: 'Test',
      image: '/assets/images/logo-cemet1.jpeg',
      price: 1000,
      description: 'test'
    },
    {
      id: 1,
      title: 'Test',
      image: '/assets/images/logo-cemet1.jpeg',
      price: 1000,
      description: 'test'
    },
    {
      id: 1,
      title: 'Test',
      image: '/assets/images/logo-cemet1.jpeg',
      price: 1000,
      description: 'test'
    },
    {
      id: 1,
      title: 'Test',
      image: '/assets/images/logo-cemet1.jpeg',
      price: 1000,
      description: 'test'
    },
    {
      id: 1,
      title: 'Test',
      image: '/assets/images/logo-cemet1.jpeg',
      price: 1000,
      description: 'test'
    })
  }

}
