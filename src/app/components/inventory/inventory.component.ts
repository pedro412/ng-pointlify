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

      this.afs.doc<any[]>(`products/${this.uid}`).valueChanges().subscribe(data => {
        this.products = data;
       });

    });

  }

}
