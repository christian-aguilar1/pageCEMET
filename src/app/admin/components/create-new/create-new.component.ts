import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { finalize, Observable, Subscription } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';
import { New } from 'src/app/core/models/new';

@Component({
  selector: 'app-create',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss'],
})
export class CreateNewComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  submitted = false;
  clicked = false;
  isLoading!: boolean;
  name$: string = '';
  image$!: Observable<any>;
  error: boolean = false;
  errorRequired: boolean = false;
  errorMinLength: boolean = false;
  errorMaxLength: boolean = false;
  public user: boolean = false;
  public text!: string;
  public categories = [];

  message = '';

  imageSub$!: Subscription;
  upload$!: Subscription;
  user$!: Subscription;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: AngularFireStorage,
    private db: FirestoreService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.hasUser();
  }

  ngOnDestroy(): void {
    if (this.imageSub$) this.imageSub$.unsubscribe();
    if (this.upload$) this.upload$.unsubscribe();
    if (this.user$) this.user$.unsubscribe();
  }

  createNew(event: any) {
    event.preventDefault();
    this.clicked = true;

    if (this.form.value.body.includes('\n')) {
      this.form.value.body = this.form.value.body.replace(/\n/g, '<br>');
    }

    if (this.form.valid) {
      this.submitted = true;
      this.isLoading = true;
      let values = this.form.value;
      let time = Date.now();
      let currentDate = new Date(time);
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let document = ' ';
      const charactersLength = characters.length;
      for (let i = 0; i < 20; i++) {
        document += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      let newForm: New = {
        title: values.title,
        image: this.name$,
        categories: values.category,
        date: currentDate,
        body: values.body,
      };
      this.db
        .createCollection('news', document, newForm)
        .then(() => {
          this.router.navigate(['/noticias']);
        })
        .catch((err) => {
          this.message = 'No se pudo crear la noticia, intente nuevamente';
        });
      this.isLoading = false;
    }
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.name$ = file.name;
    const fileRef = this.storage.ref(this.name$);
    const task = this.storage.upload(this.name$, file);

    this.upload$ = task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.imageSub$ = this.image$.subscribe((url: any) => {
            this.form.get('image')?.setValue(url);
          });
        })
      )
      .subscribe();
  }

  hasUser() {
    this.user$ = this.authService.hasUser().subscribe((res) => {
      if (res && res.uid) {
        this.user = true;
      }
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }
}
