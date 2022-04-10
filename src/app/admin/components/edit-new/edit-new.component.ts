import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { finalize, Observable } from 'rxjs';

import { New } from 'src/app/core/models/new';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-edit-new',
  templateUrl: './edit-new.component.html',
  styleUrls: ['./edit-new.component.scss']
})
export class EditNewComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  clicked = false;
  isLoading!: boolean;
  name$: string = "";
  image$!: Observable<any>;
  error: boolean = false;
  errorRequired: boolean = false;
  errorMinLength: boolean = false;
  have: boolean = false;
  image: string = "";
  public new = {} as any;
  public idDoc = "";
  public user: boolean = false;
  public categories = [];

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router,
              private storage: AngularFireStorage, private db: FirestoreService, private activeRoute: ActivatedRoute) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.hasUser();
    this.activeRoute.params.subscribe((params: Params) => this.idDoc = params['id']);
    this.db.getCollection('news', this.idDoc).subscribe((snapshot) => {
      this.new = Object.assign(this.new, snapshot.data());
      if (this.new.image !== "") {
        const fileRef = this.storage.ref(this.new.image);
        const imageRef = fileRef.getDownloadURL();
        imageRef.forEach((url) => {
          this.image = url;
          this.have = true;
        })
      }
    });
  }

  editNew(event: any) {
    event.preventDefault();
    this.clicked = true;

    if (this.form.valid) {
      this.submitted = true;
      this.isLoading = true;
      let values = this.form.value;
      let time = Date.now();
      let currentDate = new Date(time);
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let document= ' ';
      const charactersLength = characters.length;
      for ( let i = 0; i < 20; i++ ) {
        document += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      let newForm: New = {
        title: values.title,
        image: this.name$,
        categories: values.category,
        date: currentDate,
        body: values.body
      };
      this.db.createCollection('news', document, newForm)
        .then(() => {
          this.router.navigate(['/noticias'])
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
      title: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }

}
