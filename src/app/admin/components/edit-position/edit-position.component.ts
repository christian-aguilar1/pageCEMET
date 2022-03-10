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
  public user: boolean = false;
  name$: string = "";
  image$!: Observable<any>;
  image: string = "";
  submitted = false;
  clicked = false;
  isLoading!: boolean;
  have: boolean = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder,
              private db: FirestoreService, private storage: AngularFireStorage, private activeRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.hasUser()
    this.buildForm();
    this.activeRoute.params.subscribe((params: Params) => this.idDoc = params['id']);
    this.db.getCollection('management', this.idDoc).subscribe((snapshot) => {
      this.position = Object.assign(this.position, snapshot.data());
      if (this.position.image !== "") {
        const fileRef = this.storage.ref(this.position.image);
        const imageRef = fileRef.getDownloadURL();
        imageRef.forEach((url) => {
          this.image = url;
          this.have = true;
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
      let name_img;
      if (this.name$ === "") {
        name_img = this.position.image;
      } else {
        name_img = this.name$;
      }
      position = {
        name: values.name,
        position: values.position,
        email: values.email,
        image: name_img,
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
        this.have = false;
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
      name: ['', [Validators.required, Validators.minLength(8)]],
      position: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', Validators.pattern('^[a-z]{4,}\.[a-z]{4,}(\.[a-z])?\@usach\.cl$')],
      details: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() { return this.form.controls; }

}
