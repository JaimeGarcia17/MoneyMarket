import { Injectable } from '@angular/core';
import { Cartera } from 'src/app/models/cartera';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarteraService {

  private afs: AngularFirestoreCollection<Cartera>;
  constructor(private firestore: AngularFirestore) {
    this.afs = this.firestore.collection("cartera");
  }

  public getCartera(): Observable<Cartera[]> {
    return this.afs.valueChanges();
  }

  public createAccion (data: Cartera): Promise<string> {
    data.id = this.firestore.createId();
    return this.afs
      .doc(data.id)
      .set({ ...data })
      .then((r) => {
        return data.id;
      });
  }

  public deleteAccion(id: string) {
    return this.afs.doc(id).delete();
  }

}
