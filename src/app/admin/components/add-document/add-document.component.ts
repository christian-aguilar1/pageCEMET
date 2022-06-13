import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { finalize, Observable, Subscription } from 'rxjs';

import { Documento } from 'src/app/core/models/document';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss'],
})
export class AddDocumentComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  public idDocs = [] as any;
  public user: boolean = false;
  name$: string = '';
  image$!: Observable<any>;
  submitted = false;
  clicked = false;
  isLoading!: boolean;
  errorRequiredDocument: boolean = true;
  errorTypeDocument: boolean = false;

  message = '';

  collection$!: Subscription;
  upload$!: Subscription;
  imageSub$!: Subscription;
  user$!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private db: FirestoreService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.hasUser();
    this.buildForm();
    this.collection$ = this.db.getCollections('documents').subscribe((snapshot) => {
      snapshot.forEach((doc) => {
        this.idDocs.push(doc.id);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.collection$) this.collection$.unsubscribe();
    if (this.imageSub$) this.imageSub$.unsubscribe();
    if (this.upload$) this.upload$.unsubscribe();
    if (this.user$) this.user$.unsubscribe();
  }

  addPosition(values: any) {
    this.clicked = true;

    if (this.form.valid) {
      this.submitted = true;
      this.isLoading = true;
      let order = '0';
      let documents: Documento = {
        name: values.name,
        category: values.category,
        document: this.name$,
      };
      if (this.idDocs.length > 0) {
        for (let i = 0; i < this.idDocs.length; i++) {
          if (!isNaN(this.idDocs[i])) {
            order = String(Number(this.idDocs[i]) + 1);
          }
        }
      }
      this.db
        .createCollection('documents', order, documents)
        .then(() => {
          this.router.navigate(['/documentos']);
        })
        .catch((err) => {
          this.message = 'No se pudo agregar el documento';
        });
      this.isLoading = false;
    }
  }

  uploadFile(event: any) {
    this.errorRequiredDocument = false;
    const file = event.target.files[0];
    this.name$ = file.name;
    const fileRef = this.storage.ref(this.name$);
    const task = this.storage.upload(this.name$, file);

    if (file.type === 'application/pdf') {
      this.errorTypeDocument = false;
      this.upload$ = task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.image$ = fileRef.getDownloadURL();
            this.imageSub$ = this.image$.subscribe((url: any) => {
              this.form.get('pdf')?.setValue(url);
            });
          })
        )
        .subscribe();
    } else {
      this.errorTypeDocument = true;
    }
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
      name: ['', [Validators.required, Validators.minLength(8)]],
      category: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.form.controls;
  }
}
