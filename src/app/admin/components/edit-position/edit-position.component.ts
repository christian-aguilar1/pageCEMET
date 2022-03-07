import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { finalize, Observable } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/compat/storage';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Position } from 'src/app/core/models/position';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.scss']
})
export class EditPositionComponent implements OnInit {

  form!: FormGroup;
  public position = {} as any;
  public idDoc = "";
  name$: string = "";
  image$!: Observable<any>;
  submitted = false;
  clicked = false;
  isLoading!: boolean;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder,
              private db: FirestoreService, private storage: AngularFireStorage, private activeRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.buildForm();
    this.activeRoute.params.subscribe((params: Params) => this.idDoc = params['id']);
    this.db.getCollection('management', this.idDoc).subscribe((snapshot) => {
      this.position = Object.assign(this.position, snapshot.data());
      if (this.position.image !== "") {
        const fileRef = this.storage.ref(this.position.image);
        const imageRef = fileRef.getDownloadURL();
        imageRef.subscribe((url: any) => {;
          this.form.get('image')?.setValue(url);
        })
      }
    })

  }

  editPosition(values: any) {
    this.clicked = true;

    if (this.form.valid) {
      this.submitted = true;
      this.isLoading = true;
      let position: Position;
      position = {
        name: values.name,
        position: values.position,
        email: values.email,
        image: this.name$,
        details: values.details,
      }
      this.db.createCollection('management', this.idDoc, position)
        .then(() => {
          this.router.navigate(['/directiva'])
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

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/home']);
      });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      position: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', Validators.pattern('^[a-z]{4,}\.[a-z]{4,}(\.[a-z])?\@usach\.cl$')],
      details: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() { return this.form.controls; }

}
