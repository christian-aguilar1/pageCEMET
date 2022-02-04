import { Component, Input, OnInit } from '@angular/core';

import { New } from 'src/app/core/models/new';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input()
  new!: New;

  constructor() { }

  ngOnInit(): void {
  }

}
