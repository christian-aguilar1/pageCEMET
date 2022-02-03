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



  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }

}
