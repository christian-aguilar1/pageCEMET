import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: AngularFirestore) { }

  public createCollection(collection: string, documentId: string, data: {id: number, name: string, description: string, price: number, image: string}) {
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
