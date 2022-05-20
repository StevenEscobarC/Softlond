import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.luv2shopApiUrl + '/products';
  private categoryUrl = environment.luv2shopApiUrl + '/product-category';

  constructor(private httpClient: HttpClient) { }

  

  //soporte para paginate integrado en el Spring boot data rest, solo se le pasa el numero de pagina y el tamaño
  getProductListPaginate(thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<GetResponseProducts> {

    //construir url basado en la category_id, numero de pagina y tamaño
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` +
      `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {

    //construir url basado en la category_id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  //para obtener los detalles del producto
  getProduct(theProductId: number): Observable<Product> {
    //construir url basado en el id del producto
    const searchUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }


  //busca los productos en base a la keyword
  searchProducts(theKeyword: string): Observable<Product[]> {
    //construir url basado en el keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  //busca los productos en base a la keyword, adwemas de tener soporte para paginate
  searchProductsPaginate(thePage: number,
    thePageSize: number,
    theKeyword: string): Observable<GetResponseProducts> {

    //construir url basado en el keyword, numero de pagina y tamaño
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}` +
      `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}