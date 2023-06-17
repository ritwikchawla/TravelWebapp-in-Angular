import { Injectable } from '@angular/core';
import { IFeatured } from '../models';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FeaturedService {

  constructor(
    private firesore:AngularFirestore,
    private router: Router,
    private toastrService: ToastrService
  ) { }
  
 async create(featuredData: IFeatured){
  try{
    await this.firesore.collection('featured').add(featuredData);
    this.toastrService.success(`New featured trip for ${featuredData.destination} created!`, 'Success');
      this.router.navigate(['/user/home']);
    }catch(error) {
      this.handleError(error)
    }
  }

  getAll(){
    return this.firesore.collection<IFeatured>('featured')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as IFeatured;
          }
        )}
      )
    )
  }

  getMostLiked(){
    return this.firesore.collection<IFeatured>('featured',  (ref) => ref.orderBy('likes', 'desc').limit(3))
    .snapshotChanges()
    .pipe(
      map(docArray => {
        
        return docArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as IFeatured;
        }
      )}
    )
  )
}


  getById(id:string){
    return this.firesore.collection<IFeatured>('featured').doc(id).snapshotChanges().pipe(
      map(docArray => {
        return {
          id:id,
          ...docArray.payload.data()
        } as IFeatured
      })
    )
  }

  async edit(id: string, data: any){
    try{
      await this.firesore.doc(`featured/${id}`).update(data);
      this.router.navigate([`/featured/details/${id}`]);
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
