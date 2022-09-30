import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {ProductModel} from "../../model/productModel.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from "../../state/products.state";
import {Router} from "@angular/router";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$:Observable<AppDataState<ProductModel[]>> | null=null
  readonly dataStateEnum=DataStateEnum; //Constante à utiliser dans products.component.html

   constructor(private httpService:ProductsService, private router:Router) {

  }

  ngOnInit(): void {
  }
  onGetAllProducts(){
    this.products$=
      this.httpService.getAllProducts().
      pipe(
        map(data=>({dataState:DataStateEnum.LOADED,data:data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err => of({DataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );
  }
  onGetSelectedProducts(){
    this.products$=
      this.httpService.getSelectedProducts().
      pipe(
        map(data=>({dataState:DataStateEnum.LOADED,data:data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err => of({DataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );
  }
  onGetAvailableProducts(){
    this.products$=
      this.httpService.getAvailableProducts().
      pipe(
        map(data=>({dataState:DataStateEnum.LOADED,data:data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err => of({DataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );
  }
  onSearch(dataForm: any) {
    this.products$=
      this.httpService.searchProducts(dataForm.keyword).
      pipe(
        map(data=>({dataState:DataStateEnum.LOADED,data:data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err => of({DataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );
  }
    onSelect(p: ProductModel) {
     this.httpService.select(p)
         .subscribe(data=>{
      p.selected=data.selected;
     })
  }
      onDelete(p: ProductModel) {
    let v=confirm("Etes-vous sûre de vouloir supprimer ?");
    if(v==true)
       this.httpService.deleteProduct(p)
       .subscribe(data=>{
       this.onGetAllProducts();
     })
  }

  onNewProduct() {
   this.router.navigateByUrl("/newProduct");
  }

  onEdit(p: ProductModel) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts(); break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts();break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts();break;
      case ProductActionsTypes.SEARCH_PRODUCTS:this.onSearch($event.payload); break;
      case ProductActionsTypes.NEW_PRODUCTS:this.onNewProduct(); break;
      case ProductActionsTypes.SELECT_PRODUCTS:this.onSelect($event.payload); break;
      case ProductActionsTypes.DELETE_PRODUCTS:this.onDelete($event.payload); break;
      case ProductActionsTypes.EDIT_PRODUCTS:this.onEdit($event.payload); break


    }
  }
}
