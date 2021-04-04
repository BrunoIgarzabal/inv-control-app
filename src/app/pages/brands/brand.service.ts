import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Brand, CreateBrand } from './brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  insert(newBrand: CreateBrand) {
    return this.http.post(`${environment.api_url}brands`, newBrand);
  }

  update(brand: Brand) {
    return this.http.put(`${environment.api_url}brands/${brand.id}`, brand);
  }

  delete(id: number) {
    return this.http.delete(`${environment.api_url}brands/${id}`);
  }

  find(id: number) {
    return this.http.get(`${environment.api_url}brands/${id}`);
  }
}
