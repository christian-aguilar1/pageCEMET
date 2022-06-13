import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { finalize, Observable, Subscription } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/compat/storage';

import { AuthService } from 'src/app/core/services/auth/auth.service';
// import { Position } from 'src/app/core/models/position';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.scss'],
})
export class AddPositionComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  public position = {} as any;
  public year = '';
  public user: boolean = false;
  fileMember!: File;
  fileLogo!: File;
  nameImageMember$: string = '';
  nameImageLogo$: string = '';
  image$!: Observable<any>;
  imageUploadMember: string = '';
  imageUploadLogo: string = '';
  miembros: Array<string> = [];
  submitted = false;
  clicked = false;
  isLoading!: boolean;
  haveImageMember: boolean = false;
  haveLogo: boolean = false;

  mission: string = '';
  vision: string = '';

  message = '';

  params$!: Subscription;
  collection$!: Subscription;
  imageSub$!: Subscription;
  upload$!: Subscription;
  user$!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private db: FirestoreService,
    private storage: AngularFireStorage,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.hasUser();
    this.buildForm();
  }

  ngOnDestroy(): void {
    if (this.params$) this.params$.unsubscribe();
    if (this.collection$) this.collection$.unsubscribe();
    if (this.upload$) this.upload$.unsubscribe();
    if (this.user$) this.user$.unsubscribe();
  }

  editPosition(values: any) {
    this.clicked = true;

    if (this.haveLogo) {
      this.isLoading = true;
      const fileRef = this.storage.ref(this.nameImageLogo$);
      const task = this.storage.upload(this.nameImageLogo$, this.fileLogo);
      this.upload$ = task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.image$ = fileRef.getDownloadURL();
            this.imageSub$ = this.image$.subscribe((url: any) => {
              this.isLoading = false;
            });
          })
        )
        .subscribe();
    }

    if (this.form.valid) {
      let mission = values.mission.split('\n');
      let vision = values.vision.split('\n');
      let year = values.year.toString();

      let position = {
        logo: this.nameImageLogo$,
        mission: mission,
        vision: vision,
        members: this.miembros,
      };
      this.isLoading = true;
      this.db
        .createCollection('management', year, position)
        .then(() => {
          this.router.navigate(['/quienes-somos']);
          this.isLoading = false;
        })
        .catch((err) => {
          this.message = 'No se pudo editar la posición';
          this.isLoading = false;
        });
    } else {
      this.message = 'Por favor, llene todos los campos';
    }
  }

  deleteImage() {
    this.haveImageMember = false;
    this.nameImageMember$ = '';
    this.imageUploadMember = '';
  }

  deleteLogo() {
    this.haveLogo = false;
    this.nameImageLogo$ = '';
    this.imageUploadLogo = '';
  }

  agregarMiembro() {
    this.miembros.push(this.nameImageMember$);
    this.isLoading = true;
    const fileRef = this.storage.ref(this.nameImageMember$);
    const task = this.storage.upload(this.nameImageMember$, this.fileMember);
    this.upload$ = task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.imageSub$ = this.image$.subscribe((url: any) => {
            this.isLoading = false;
          });
        })
      )
      .subscribe();
  }

  previewImage(event: any) {
    this.fileMember = event.target.files[0];
    this.extraerBase64(this.fileMember).then((imagen: any) => {
      this.imageUploadMember = imagen.base;
    });
    this.haveImageMember = true;
    this.nameImageMember$ = this.fileMember.name;
  }

  previewLogo(event: any) {
    this.fileLogo = event.target.files[0];
    this.extraerBase64(this.fileLogo).then((imagen: any) => {
      this.imageUploadLogo = imagen.base;
    });
    this.haveLogo = true;
    this.nameImageLogo$ = this.fileLogo.name;
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            blob: $event,
            image,
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          reject({
            blob: $event,
            image,
            base: null,
          });
        };
        return 0;
      } catch (e) {
        return null;
      }
    });

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
      year: ['', [Validators.required, Validators.min(1970), Validators.max(2100)]],
      mission: ['', [Validators.required, Validators.minLength(8)]],
      vision: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.form.controls;
  }
}
