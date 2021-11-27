import { Observable } from "rxjs";
import {HttpClient} from '@angular/common/http';
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root',
 })
export class ImageService {

  constructor(private Http: HttpClient) {}


  public uploadImage(image: File): Observable<any> {
    const formData = new FormData();

    formData.append('image', image, "img");

    return this.Http.post('http://192.168.25.230:3500/detect/image', formData);
  }
}
