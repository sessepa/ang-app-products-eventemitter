import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from "../../../state/products.state";
import {ProductModel} from "../../../model/productModel.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$:Observable<AppDataState<ProductModel[]>> | null=null

  @Output() productsEventEmitter:EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>();

  readonly dataStateEnum=DataStateEnum; //Constante à utiliser dans products.component.html
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(p: ProductModel) {
  this.productsEventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCTS, payload:p});
  }

  onDelete(p: ProductModel) {
    this.productsEventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCTS, payload:p});
  }

  onEdit(p: ProductModel) {
    this.productsEventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCTS, payload:p});
  }

  onActionEvent($event: ActionEvent) {
    this.productsEventEmitter.emit($event);
  }
}
