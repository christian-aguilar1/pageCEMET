import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { finalize, Observable, Subscription } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/compat/storage';

import { AuthService } from 'src/app/core/services/auth/auth.service';
// import { Position } from 'src/app/core/models/position';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.scss'],
})
export class EditPositionComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  public position = {} as any;
  public year = '';
  public user: boolean = false;
  fileMember!: File;
  fileLogo!: File;
  nameMember$: string = '';
  nameLogo$: string = '';
  image$!: Observable<any>;
  imageUploadMember: string = '';
  imageUploadLogo: string = '';
  images: Array<any> = [];
  miembros: Array<string> = [];
  submitted = false;
  clicked = false;
  isLoading!: boolean;
  haveMemberImage: boolean = false;
  haveLogoImage: boolean = false;
  uploadLogo: boolean = false;

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
    private activeRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.hasUser();
    this.buildForm();
    this.params$ = this.activeRoute.params.subscribe((params: Params) => (this.year = params['id']));
    this.collection$ = this.db.getCollection('management', this.year).subscribe((snapshot) => {
      this.position = Object.assign(this.position, snapshot.data());
      if (this.position.mission) this.mission = this.position.mission.join('\n');
      if (this.position.vision) this.vision = this.position.vision.join('\n');
      if (this.position.members) this.miembros = this.position.members;
      if (this.position.logo !== '' && this.position.logo !== undefined) {
        this.haveLogoImage = true;
        this.nameLogo$ = this.position.logo;
        this.image$ = this.storage.ref(this.position.logo).getDownloadURL();
        this.imageSub$ = this.image$.subscribe((url: any) => {
          this.imageUploadLogo = url;
        });
      }
      if (this.position.members !== '' && this.position.members !== undefined) {
        for (const member of this.position.members) {
          const fileRef = this.storage.ref(member);
          const imageRef = fileRef.getDownloadURL();
          imageRef.forEach((url) => {
            this.images.push({
              name: member,
              url: url,
            });
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.params$) this.params$.unsubscribe();
    if (this.collection$) this.collection$.unsubscribe();
    if (this.upload$) this.upload$.unsubscribe();
    if (this.user$) this.user$.unsubscribe();
  }

  editPosition(values: any) {
    this.clicked = true;

    if (this.uploadLogo) {
      this.isLoading = true;
      const fileRef = this.storage.ref(this.nameLogo$);
      const task = this.storage.upload(this.nameLogo$, this.fileLogo);
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
      this.isLoading = true;
      let mission = values.mission.split('\n');
      let vision = values.vision.split('\n');

      let position = {
        mission: mission,
        vision: vision,
        logo: this.nameLogo$,
        members: this.miembros,
      };
      this.db
        .createCollection('management', this.year, position)
        .then(() => {
          this.router.navigate(['/quienes-somos/' + this.year]);
          this.isLoading = false;
        })
        .catch((err) => {
          this.message = 'No se pudo editar la posición';
          this.isLoading = false;
        });
    } else {
      this.message = 'Por favor, llene todos los campos requeridos';
    }
  }

  deleteImage() {
    this.haveMemberImage = false;
    this.nameMember$ = '';
    this.imageUploadMember = '';
  }

  deleteLogo() {
    this.haveLogoImage = false;
    this.nameLogo$ = '';
    this.imageUploadLogo = '';
  }

  deleteImageMember(image: any) {
    this.miembros = this.miembros.filter((item) => item !== image.name);
    this.storage.ref(image.name).delete();
    this.images.splice(this.images.indexOf(image), 1);
  }

  agregarMiembro() {
    this.miembros.push(this.nameMember$);
    this.isLoading = true;
    const fileRef = this.storage.ref(this.nameMember$);
    const task = this.storage.upload(this.nameMember$, this.fileMember);
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
    this.haveMemberImage = true;
    this.nameMember$ = this.fileMember.name;
  }

  previewLogo(event: any) {
    this.fileLogo = event.target.files[0];
    this.extraerBase64(this.fileLogo).then((imagen: any) => {
      this.imageUploadLogo = imagen.base;
    });
    this.uploadLogo = true;
    this.nameLogo$ = this.fileLogo.name;
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
      mission: ['', [Validators.required, Validators.minLength(8)]],
      vision: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.form.controls;
  }
}
