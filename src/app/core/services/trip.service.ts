import { Injectable} from '@angular/core';
import { ITrip } from '../models';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(
    private firesore:AngularFirestore,
    private router: Router,
    private toastrService: ToastrService
  ) { }

 async create(tripData: ITrip){
  try{
    await this.firesore.collection('trips').add(tripData);
    this.toastrService.success(`Congrats you are going to ${tripData.destination}!`, 'Success');
      this.router.navigate(['/user/home']);
    }catch(error) {
      this.handleError(error)
    }
  }

  
  getUserTrips() {
    const uid = localStorage.getItem('uid');
    return this.firesore.collection<ITrip>('trips',
      (ref) => ref.where('authorId', '==', uid)
      ).snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as ITrip;
          }
        )}
      )
    )
  }

  getPublicTrips(){
    return this.firesore.collection<ITrip>('trips',
      (ref) => ref.where('private', '==', false))
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as ITrip;
          }
        )}
      )
    )
  }

  getById(id:string){
    return this.firesore.collection<ITrip>('trips').doc(id).snapshotChanges().pipe(
      map(docArray => {
        return {
          id:id,
          ...docArray.payload.data()
        } as ITrip;
      })
    )
  }

  async edit(id: string, tripData: any){
    try{
      await this.firesore.doc(`trips/${id}`).update(tripData);
      this.toastrService.success(`You have edited your trip to ${tripData.destination}!`, 'Success');
      this.router.navigate(['/trip/details', id]);
    }catch(error) {
      this.handleError(error)
    }
  }

  async delete(id: string){
    try{
      if(confirm('Are you sure you want to delete this trip?')){
        await this.firesore.doc(`trips/${id}`).delete();
        this.toastrService.success('Trip deleted!', 'Success');
        this.router.navigate(['/trip/mine']);
      }
    }catch(error) {
      this.handleError(error)
    }
  }

  //If error, console log and notify the user
  handleError(error) {
    console.log(error);
    this.toastrService.error(error.message, 'Error');
  }
}
