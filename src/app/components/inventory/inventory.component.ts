import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  products: any;
  uid: string;
  constructor(private afs: AngularFirestore, private authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe(resp => {
      this.uid = resp.uid;
      console.log(this.uid);

      this.afs.collection<any[]>(`/products/`).doc(`${this.uid}`).get().subscribe(resp => {
        console.log(resp);
      });

    });

  }

}
