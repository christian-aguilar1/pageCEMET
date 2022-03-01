import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MailSenderService } from 'src/app/core/services/mail-sender/mail-sender.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  clicked = false;
  isLoading!: boolean;

  constructor(private formBuilder: FormBuilder, private mailSender: MailSenderService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  sendEmail(values: any) {
    this.clicked = true;

    if (this.form.valid) {
      this.submitted = true;
      this.isLoading = true;
      this.form.disable();
      this.mailSender.sendMessage(values.name, values.email, values.message);
      this.isLoading = false;
      console.log(values.name, values.email, values.message);
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z]{4,}\.[a-z]{4,}(\.[a-z])?\@usach\.cl$')]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() { return this.form.controls; }

}
