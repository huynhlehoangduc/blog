import { Component, OnInit } from '@angular/core';
import { PostService } from '../../@core/services/post.service';
import { Post } from '../../../@core/interfaces/post';
import { BreadcrumbService } from '../../../@core/services/breadcrumb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];
  pageSize: number = 10;
  pageIndex: number = 1;
  totalCount: number = 0;
  loading: boolean = true;
  initialLoading: boolean = true;
  skeletonItems = ['','','','','']

  constructor(private readonly postService: PostService,
              private readonly breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.loadPost();
    this.breadcrumbService.setBreadcrumbItems([]);
  }

  loadPost(): void {
    this.loading = true;
    this.postService.list({ params: { page: this.pageIndex, take: this.pageSize }}).subscribe(res => {
      this.posts = res.data;
      this.totalCount = res.meta.itemCount;
      this.loading = false;
      this.initialLoading = false;
    });
  }

  changePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.loadPost();
  }

  changePageIndex(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.loadPost();
  }
}
