import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  uid: string;
  constructor(private afs: AngularFirestore, private authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe(resp => {
      this.uid = resp.uid;
    });
  }

  submit(f: NgForm) {
    console.log(f.value);

    this.afs.collection(`/products/${this.uid}/${f.value.category}`)
      .add(f.value)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      });
  }

}
