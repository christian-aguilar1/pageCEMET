import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

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
  career: string = "Carrera";
  careerInvalid: boolean = false;
  denounced: string = "Estudiante, Profesor o Ayudante";
  denouncedInvalid: boolean = false;
  isProfessor: boolean = false;
  inputRadio: boolean = false;
  answerQuestion: string = "";
  radioInvalid: boolean = true;
  // subject: string = "";
  subjectInvalid: boolean = false;

  constructor(private formBuilder: FormBuilder, private mailSender: MailSenderService, private title: Title) {
    this.title.setTitle("Reclamos - CEMET")
    this.buildForm();
  }

  ngOnInit(): void {
  }

  sendEmail(values: any) {
    this.clicked = true;
    if (this.career === "Carrera") {
      this.careerInvalid = true;
    } else {
      this.careerInvalid = false;
    }

    if (this.denounced === "Estudiante, Profesor o Ayudante") {
      this.denouncedInvalid = true;
    } else {
      this.denouncedInvalid = false;
    }

    if ((this.denounced === "Profesor" || this.denounced === "Ayudante") && values.subject === "") {
      this.subjectInvalid = true;
    }

    if (this.inputRadio) {this.answerQuestion = "Sí"} else {this.answerQuestion = "No"}

    if (this.form.valid && !this.careerInvalid && !this.denouncedInvalid && !this.subjectInvalid) {
      this.submitted = true;
      this.isLoading = true;
      this.form.disable();
      let fullMessage = ""

      if (this.denounced === "Estudiante") {
        fullMessage = `Carrera de la persona que hace el reclamo: ${this.career}\n
La persona a la que va dirigida el reclamo es: ${this.denounced}\n
Nombre de la persona a la que va dirigido el reclamo: ${values.blamedName}\n
Se dio la instancia para conversar?: ${this.answerQuestion}\n
Situación a denunciar: ${values.message}\n`
      } else {
        fullMessage =`Carrera de la persona que hace el reclamo: ${this.career}\n
La persona a la que va dirigida el reclamo es: ${this.denounced}\n
Ramo que imparte: ${values.subject}\n
Nombre de la persona a la que va dirigido el reclamo: ${values.blamedName}\n
Se dio la instancia para conversar?: ${this.answerQuestion}\n
Situación a denunciar: ${values.message}\n`
      }
      this.mailSender.sendMessage(values.name, values.email, fullMessage, 'complaints');
      this.isLoading = false;
    }
  }

  fillDropdown(selected: string) {
    if (selected === "civil") {
      this.career = "Ingeniería Civil en Metalurgia"
    } else if (selected === "ejecucion") {
      this.career = "Ingeniería de Ejecución en Metalurgia"
    } else if (selected === "student") {
      this.denounced = "Estudiante"
    } else if (selected === "professor") {
      this.denounced = "Profesor"
      this.isProfessor = true;
    } else if (selected === "assistant") {
      this.denounced = "Ayudante"
      this.isProfessor = true;
    } else if (selected === "yes") {
      this.inputRadio = true
      this.radioInvalid = false;
    } else if (selected === "no") {
      this.inputRadio = false
      this.radioInvalid = false;
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z]{4,}\.[a-z]{4,}(\.[a-z])?\@usach\.cl$')]],
      subject: [''],
      blamedName: ['', [Validators.required, Validators.minLength(8)]],
      message: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  get f() { return this.form.controls; }

}
