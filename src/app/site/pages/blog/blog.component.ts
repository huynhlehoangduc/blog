import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { Post } from '../../../@core/interfaces/post';
import { PostService } from '../../@core/services/post.service';
import { Observable } from 'rxjs';
import { BreadcrumbService } from '../../../@core/services/breadcrumb.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  post$: Observable<Post>;
  skeletonItems = ['','','','',''];
  index = 1;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly postService: PostService,
              private readonly breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.post$ = this.activatedRoute.params.pipe(
      map(params => params.id),
      switchMap(id => this.postService.get(id)),
      tap(post => this.breadcrumbService.setBreadcrumbItems([{ title: post.title }]))
    )
  }
}
