import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject }  from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  usersRef!: AngularFireList<any>;
  userRef!: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  public getDB(ref: string) {
    return this.db.database.ref(ref).get();
  }
}
