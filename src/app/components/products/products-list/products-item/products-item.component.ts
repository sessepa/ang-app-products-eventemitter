import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductModel} from "../../../../model/productModel.model";
import {ActionEvent, ProductActionsTypes} from "../../../../state/products.state";

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {
@Input() product?:ProductModel;
@Output() eventEmitter:EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(p: ProductModel) {
   this.eventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCTS,payload:p});
  }

  onDelete(p: ProductModel) {
    this.eventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCTS,payload:p});
  }

  onEdit(p: ProductModel) {
    this.eventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCTS,payload:p});
  }
}
