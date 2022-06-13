import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit, OnDestroy {
  public positions = [] as any;
  public user: boolean = false;
  public idDocs = [] as any;

  mission: Array<string> = [];
  vision: Array<string> = [];
  images: Array<any> = [];
  logo: String = '';

  user$!: Subscription;
  collection$!: Subscription;

  currentYear = new Date().getFullYear().toString();

  isSmallScreen = this.breakpointObserver.isMatched('(min-width: 770px)');

  constructor(
    private authService: AuthService,
    private router: Router,
    private firestoreService: FirestoreService,
    private title: Title,
    private breakpointObserver: BreakpointObserver,
    private storage: AngularFireStorage
  ) {
    this.title.setTitle('Quiénes Somos - CEMET');
  }

  ngOnInit(): void {
    this.hasUser();
    this.collection$ = this.firestoreService.getCollections('management').subscribe((snapshot) => {
      this.positions = [];
      snapshot.forEach((doc) => {
        this.positions.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      for (const doc of this.positions) {
        if (doc.id === this.currentYear) {
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

  changeYear(year: string) {
    this.router.navigate(['/quienes-somos/' + year]);
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
