import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

   productFormGroup?:FormGroup;
   submitted:boolean=false;
   infoMessage?:string;

  constructor(private fb:FormBuilder, private httService:ProductsService) { }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      name:["",Validators.required],
      price:[10,[Validators.required,Validators.min(10)]],
      quantity:[1,[Validators.required,Validators.min(1)]],
      selected:[false, Validators.required],
      available:[false,Validators.required]
    });
  }

  onSave() {
    this.submitted=true;
    if(this.productFormGroup?.invalid) return;
     this.httService.save(this.productFormGroup?.value)
       .subscribe(data=>{
       //alert("success saving product");
       this.infoMessage="Success adding product";
     });
  }
}
