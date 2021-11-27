import { Observable } from "rxjs";
import {HttpClient} from '@angular/common/http';
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root',
 })
export class VideoService {

  constructor(private Http: HttpClient) {}


  public uploadVideo(video: File): Observable<any> {
    const formData = new FormData();

    formData.append('video', video, "vid");

    return this.Http.post('http://192.168.25.230:3500/detect/video', formData);
  }
}
