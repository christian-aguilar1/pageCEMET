// import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-papeo',
  templateUrl: './papeo.component.html',
  styleUrls: ['./papeo.component.scss'],
})
export class PapeoComponent implements OnInit {
  http: any;
  form!: FormGroup;
  clicked = false;
  career = 'Carrera';
  careerInvalid: boolean = false;
  url = '';

  constructor(private formBuilder: FormBuilder, private title: Title) {
    this.title.setTitle('Sube tu Papeo - CEMET');
  }

  ngOnInit(): void {
    this.buildForm();
  }

  uploadPapeo(values: any) {
    this.clicked = true;

    if (this.career === 'Carrera') {
      this.careerInvalid = true;
    } else {
      this.careerInvalid = false;
      window.open(this.url, '_blank');
    }
  }

  fillDropdown(career: string) {
    if (career === 'mbi') {
      this.career = 'MBI';
      this.url =
        'https://script.google.com/macros/s/AKfycbztxBTTXgoYXl_pWs9at3btxTqmvQClYV2aBiFHVqJGkQsiy8q5ww9r23r9etIOEhcjBw/exec';
    } else if (career === 'civil') {
      this.career = 'Civil';
      this.url =
        'https://script.google.com/macros/s/AKfycbx4hqE1H8rDGjLwO_38v9VJFLvvp11FP02-uhyeS9ovl_dbPA_nXtI9Ryjv2VJHVtSR/exec';
    } else if (career === 'ejecu') {
      this.career = 'Ejecución';
      this.url =
        'https://script.google.com/macros/s/AKfycbz_SbqwqTGW6A0eqCoOeiCFbbyFSiFpYG8iex2H4xz2ZdBul6W2fQ3CzcbD_QqQ3eT6EQ/exec';
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      file: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
