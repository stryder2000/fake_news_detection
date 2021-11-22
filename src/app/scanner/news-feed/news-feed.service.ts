import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

const key = "669a958371f541378a0487c8af8b3475";

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {

  private articles = [];
  private articlesFetched = new Subject();

  constructor(private httpClient: HttpClient) {}

  getArticles() {
    return this.httpClient.get("https://newsapi.org/v2/top-headlines?country=in&apiKey="+key)
      .subscribe( (response: any) => {
        this.articles = response['articles']
        this.articlesFetched.next([...this.articles]);
      })
  }

  getArticlesFetchedListener() {
    return this.articlesFetched.asObservable();
  }

}
