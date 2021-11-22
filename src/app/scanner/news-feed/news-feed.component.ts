import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarouselComponent } from './carousel/carousel.component';
import { NewsFeedService } from './news-feed.service';

@Component({
  selector: 'news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  @ViewChild(CarouselComponent) carousel: CarouselComponent;

  articles: any[] = [];
  private articlesSub: Subscription;

  constructor(public newsFeedService: NewsFeedService) {}

  ngOnInit(){
    this.newsFeedService.getArticles();
    this.articlesSub = this.newsFeedService.getArticlesFetchedListener()
      .subscribe((articles: any) => {
        let i: any;
        for (i in articles) {
          let article = articles[i];
          if(article['urlToImage']!= null && article['title']!=null && article['content']!=null){
            this.articles.push(article)
          }
        }
      });
  }

  ngOnDestroy(){
    this.articlesSub.unsubscribe();
  }
}
