import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of as observableOf, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { IUser } from '../models';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<IUser>;

  private _isAuth = false;
  private _isAdmin = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          this._isAuth=true;
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges()
        } else {
          //Logged out
          return observableOf(null)
        }
      })
    );
  }

  get isAdmin(){
    return this._isAdmin || !!localStorage.getItem('adminId');

  }
  get isAuth(){
    return this._isAuth || (!!localStorage.getItem('uid') || this.isAdmin);
  }

  async emailPasswordRegistration(email: string, password: string, displayName: string) {
    try {
      const { user } = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      this.setUserData(user, displayName);
      this.toastrService.success('Registration successful! You can login to your account.', 'Success');
      this.router.navigate(['/login']);
    } catch (error) {
      this.handleError(error)
    }
  }

  /// Email/Password Authentication ///
  async emailPasswordLogin(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      //Refactor this 
      this.user$.subscribe(data=>{
        if(data){
          this.saveUserInStorage(data)
          if(data.roles.includes('admin')){
            this._isAdmin=true;
          }else{
            this._isAdmin=false;
          }
        }
      });
      this.toastrService.success('Login successful!', 'Success');
      this.router.navigate(['/user/home']); 
    } catch (error) {
      this.handleError(error)
    }

  }

  //Set user data to firestore after succesful registration
  private setUserData(user, displayName: string) {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`users/${user.uid}`);
    
    const data: IUser = {
      uid: user.uid,
      email: user.email,
      displayName,
      roles:['user']
    }
    return userRef.set(data);
  }
  
  async logOut() {
    try {
      await this.afAuth.auth.signOut();
      this._isAuth=false;
      localStorage.clear()
      this.toastrService.success('Logout successful!', 'Success');
      this.router.navigate(['/home']);
    } catch (error) {
      this.handleError(error)
    }
  }
  
  saveUserInStorage(user:IUser){
    localStorage.setItem('displayName', user.displayName);
    if(user.roles.includes('admin')){
      localStorage.setItem('adminId', user.uid);
    }else{
      localStorage.setItem('uid', user.uid);
    }
  }
  
  //If error, console log and notify the user
  private handleError(error) {
    console.log(error);
    this.toastrService.error(error.message, 'Error');
  }
}
