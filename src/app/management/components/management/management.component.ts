import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public positions = [] as  any;
  public user: boolean = false;
  public idDocs = [] as  any;

  constructor(private authService: AuthService, private firestoreService: FirestoreService, private title: Title) {
    title.setTitle("Directiva - CEMET");
  }

  ngOnInit(): void {
    this.hasUser();
    this.firestoreService.getCollections('management').subscribe((snapshot) => {
      this.positions = [];
      snapshot.forEach((doc) => {
        this.positions.push(doc.data())
        this.idDocs.push(doc.id);
      })
    })
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

}
