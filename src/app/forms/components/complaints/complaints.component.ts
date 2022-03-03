import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MailSenderService } from 'src/app/core/services/mail-sender/mail-sender.service';
import { MyValidators } from 'src/app/utils/validators';

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
      let fullMessage =  `Nombre del denunciado: ${values.blamedName}\n\nSituación a denunciar: ${values.message}`
      if (values.name.length === 0) {
        this.mailSender.sendMessage("Anónimo", "Anónimo", fullMessage, 'complaints');
      } else {
        this.mailSender.sendMessage(values.name, values.email, fullMessage, 'complaints');
      }
      // this.mailSender.sendMessage(values.name, values.email, values.message, 'complaints');
      this.isLoading = false;
      console.log(values.name, values.email, values.blamedName, values.message);
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(8)]],
      email: ['', [Validators.pattern('^[a-z]{4,}\.[a-z]{4,}(\.[a-z])?\@usach\.cl$')]],
      blamedName: ['', [Validators.required, Validators.minLength(8)]],
      message: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  get f() { return this.form.controls; }

}
