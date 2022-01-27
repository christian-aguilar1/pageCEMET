import { Component, Input, OnInit } from '@angular/core';

import { New } from './../../../core/models/new';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input()
  new!: New;

  // image: string = this;

  constructor() { }

  ngOnInit(): void {
  }

}
