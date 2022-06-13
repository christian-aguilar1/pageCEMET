import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private af: AngularFireAuth) {}

  createUser(email: string, password: string) {
    return this.af.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.af.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string) {
    return this.af.sendPasswordResetEmail(email);
  }

  logout() {
    return this.af.signOut();
  }

  hasUser() {
    return this.af.authState;
  }
}
