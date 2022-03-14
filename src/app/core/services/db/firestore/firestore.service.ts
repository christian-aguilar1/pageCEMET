import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Position } from './../../../models/position';
import { New } from 'src/app/core/models/new';
import { Documento } from 'src/app/core/models/document';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: AngularFirestore) { }

  public createCollection(collection: string, documentId: string, data: New | Position | Documento) {
    return this.db.collection(collection).doc(documentId).set(data);
  }

  public getCollection(collection: string, documentId: string) {
    return this.db.collection(collection).doc(documentId).get();
  }

  public getCollections(collection: string) {
    return this.db.collection(collection).get();
  }

  public updateCollection(collection: string, documentId: string, data: any) {
    return this.db.collection(collection).doc(documentId).set(data);
  }

  public deleteCollection(collection: string, documentId: string) {
    return this.db.collection(collection).doc(documentId).delete();
  }
}
