import { Component, Input, OnInit } from '@angular/core';

import { New } from '../../../core/models/new';

@Component({
  selector: 'app-news',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {

  @Input()
  new!: New;

  // image: string = this;

  constructor() { }

  ngOnInit(): void {
  }

}
