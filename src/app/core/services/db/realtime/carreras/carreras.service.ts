import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject }  from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  usersRef!: AngularFireList<any>;
  userRef!: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  public getCareers() {
    return this.db.database.ref('carreras').get();
  }
  public getRamos() {
    return this.db.database.ref('ramos').get();
  }
}
