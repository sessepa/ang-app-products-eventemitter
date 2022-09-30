import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ProductModel} from "../model/productModel.model";

@Injectable({providedIn:"root"})
export class ProductsService{

  constructor(private httClient:HttpClient) {
  }
  getAllProducts():Observable<ProductModel[]> {
    //let myHost = environment.host;
   let myHost=(Math.random()>0.1)?environment.host:environment.unreseach; //Simulation d'apparution d'erreur aleatoire
    return this.httClient.get<ProductModel[]>(myHost + "/products");
  }
  //Selectionner un produit
    getSelectedProducts():Observable<ProductModel[]> {
      let myHost = environment.host;
      return this.httClient.get<ProductModel[]>(myHost + "/products?selected=true");
    }
    //Afficher tout les produits disponibles
      getAvailableProducts():Observable<ProductModel[]>{
        let myHost=environment.host;
        return this.httClient.get<ProductModel[]>(myHost+"/products?available=true");
      }
      //Rechercher un produit
  searchProducts(keyword:string):Observable<ProductModel[]>{
    let myHost=environment.host;
    return this.httClient.get<ProductModel[]>(myHost+"/products?name_like="+keyword);
  }
  //Selectioner un produit
  select(productSelect:ProductModel):Observable<ProductModel>{
    let myHost=environment.host;
    productSelect.selected=!productSelect.selected;
    return this.httClient.put<ProductModel>(myHost+"/products/"+productSelect.id,productSelect);
  }
  //Supprimer un produit
  deleteProduct(productDelete:ProductModel):Observable<void>{
    let myHost=environment.host;
    return this.httClient.delete<void>(myHost+"/products/"+productDelete.id);
  }

  //Ajout d'un produit
  save(product:ProductModel):Observable<ProductModel>{
    let myHost=environment.host;
    return this.httClient.post<ProductModel>(myHost+"/products/",product);
  }
  //Editer un produit dans une formulaire
  getProducts(id:number):Observable<ProductModel>{
    let myHost=environment.host;
    return this.httClient.get<ProductModel>(myHost+"/products/"+id);
  }
  //Sauvegarder la modification apportée à un produit
  upDateProducts(prod:ProductModel):Observable<ProductModel>{
    let myHost=environment.host;
    return this.httClient.put<ProductModel>(myHost+"/products/"+prod.id,prod);
  }

}
