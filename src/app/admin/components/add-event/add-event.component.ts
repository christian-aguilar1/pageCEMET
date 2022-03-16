import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireStorage } from '@angular/fire/compat/storage';

import { finalize, Observable } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';
import { Evento } from 'src/app/core/models/evento';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  form!: FormGroup;
  public idDocs = [] as  any;
  public user: boolean = false;
  name$: string = "";
  image$!: Observable<any>;
  submitted = false;
  clicked = false;
  isLoading!: boolean;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder,
              private db: FirestoreService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.hasUser();
    this.buildForm();
    this.db.getCollections('events').subscribe((snapshot) => {
      snapshot.forEach((doc) => {
        this.idDocs.push(doc.id);
      })
      // console.log(this.idDocs)
    })
  }

  addEvent(values: any) {
    this.clicked = true;

    if (this.form.valid) {
      this.submitted = true;
      this.isLoading = true;
      let order = "0";
      let event: Evento;
      // let date: Date = new Date();
      // date = values.date;
      event = {
        title: values.title,
        date: values.date,
        image: this.name$,
        details: values.details,
      }
      if (this.idDocs.length > 0) {
        for (let i = 0; i < this.idDocs.length; i++) {
          if (!isNaN(this.idDocs[i])) {
            order = String(Number(this.idDocs[i]) + 1)
          }
        }
      }
      this.db.createCollection('events', order, event)
        .then(() => {
          this.router.navigate(['/calendario'])
        })
        .catch((err) => {
          console.log(err)
        })
      this.isLoading = false;
    }
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.name$ = file.name;
    const fileRef = this.storage.ref(this.name$);
    const task = this.storage.upload(this.name$, file);

    task.snapshotChanges()
      .pipe(finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe((url: any) => {
          this.form.get('image')?.setValue(url);
        })
      }))
      .subscribe();
  }

  hasUser() {
    this.authService.hasUser().
      subscribe(res => {
        if(res && res.uid) {
          this.user = true;
        }
      }
    );
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/home']);
      });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      date: ['', Validators.required],
      details: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() { return this.form.controls; }

}
