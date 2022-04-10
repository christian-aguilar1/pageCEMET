import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-papeo',
  templateUrl: './papeo.component.html',
  styleUrls: ['./papeo.component.scss']
})
export class PapeoComponent implements OnInit {
  http: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
