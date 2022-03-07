import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Position } from 'src/app/core/models/position';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';

@Component({
  selector: 'app-management-card',
  templateUrl: './management-card.component.html',
  styleUrls: ['./management-card.component.scss']
})
export class ManagementCardComponent implements OnInit {

  @Input()
  position!: Position;
  @Input() idDoc!: string;
  image!: string;
  @Input() user!: boolean;

  constructor(private storage: AngularFireStorage, private firestoreService: FirestoreService, private router: Router) { }

  ngOnInit(): void {
    if (this.position.image !== "") {
      const fileRef = this.storage.ref(this.position.image);
      const imageRef = fileRef.getDownloadURL();
      imageRef.subscribe(url => {
        this.image = url;
      })
    }
  }

  deletePosition() {
    this.firestoreService.deleteCollection('management', this.idDoc)
      .then(() => {
        console.log("Document successfully deleted!");
        this.router.navigateByUrl('/', {skipLocationChange: true}).
          then(() =>
            this.router.navigate(['./directiva'])
          );
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      })
  }

}
