import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-management-old',
  templateUrl: './management-old.component.html',
  styleUrls: ['./management-old.component.scss'],
})
export class ManagementOldComponent implements OnInit, OnDestroy {
  public positions = [] as any;
  public user: boolean = false;
  public idDocs = [] as any;
  year: string = '';

  mission: Array<string> = [];
  vision: Array<string> = [];
  images: Array<any> = [];
  arrayImages: Array<any> = [];
  logo: String = '';

  user$!: Subscription;
  collection$!: Subscription;
  params$!: Subscription;

  isSmallScreen = this.breakpointObserver.isMatched('(min-width: 770px)');

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router,
    private title: Title,
    private breakpointObserver: BreakpointObserver,
    private storage: AngularFireStorage,
    private activeRoute: ActivatedRoute
  ) {
    this.title.setTitle('Directiva - CEMET');
  }

  ngOnInit(): void {
    this.hasUser();
    this.params$ = this.activeRoute.params.subscribe((params: Params) => (this.year = params['id']));
    this.collection$ = this.firestoreService.getCollections('management').subscribe((snapshot) => {
      this.positions = [];
      snapshot.forEach((doc) => {
        this.positions.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      for (const doc of this.positions) {
        if (doc.id === this.year) {
          const fileRef = this.storage.ref(doc.data.logo);
          const imageRef = fileRef.getDownloadURL();
          imageRef.forEach((url) => {
            this.logo = url;
          });
          if (doc.data.members) {
            for (const member of doc.data.members) {
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
          this.mission = doc.data.mission;
          this.vision = doc.data.vision;
        }
      }
      this.positions = this.positions.sort(
        (a: { id: string }, b: { id: string }) => parseInt(b.id) - parseInt(a.id)
      );
    });
  }

  deleteManagement() {
    this.firestoreService
      .deleteCollection('management', this.year)
      .then(() => {
        console.log('Document successfully deleted!');
        this.router.navigate(['/quienes-somos']);
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }

  ngOnDestroy(): void {
    if (this.collection$) this.collection$.unsubscribe();
    if (this.user$) this.user$.unsubscribe();
  }

  hasUser() {
    this.user$ = this.authService.hasUser().subscribe((res) => {
      if (res && res.uid) {
        this.user = true;
      }
    });
  }
}
