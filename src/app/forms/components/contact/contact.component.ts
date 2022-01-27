import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MailSenderService } from 'src/app/core/services/mail-sender/mail-sender.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private mailSender: MailSenderService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  sendEmail(values: any) {
    console.log(values.name, values.email, values.message);
    console.log(this.mailSender.sendMessage(values.name, values.email, values.message))
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

}
