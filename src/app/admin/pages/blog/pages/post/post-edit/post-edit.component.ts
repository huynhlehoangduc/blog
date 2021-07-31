import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../@core/services/post.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../@core/interfaces/post';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
  providers: [NzNotificationService]
})
export class PostEditComponent implements OnInit {

  fm!: FormGroup;
  post: Post = null;

  isSaving: boolean = false;
  isSavingDraft: boolean = false;
  isPublishing: boolean = false;
  isSpinning: boolean = false;
  isDeletingPost: boolean = false;

  tinymceOptions = {
    height: 500,
    menubar: false,
    plugins: [
      "advlist autolink lists link image charmap print preview hr anchor pagebreak",
      "searchreplace wordcount visualblocks visualchars code fullscreen",
      "insertdatetime media nonbreaking save table directionality",
      "emoticons template paste textpattern"
    ],
    toolbar:
      'formatselect | bold italic underline | link image | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | removeformat fullscreen',
    statusbar: false,
    paste_data_images: true,
    image_title: true,
  };

  constructor(private readonly fb: FormBuilder,
              private readonly postService: PostService,
              private readonly notification: NzNotificationService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.id) {
        this.isSpinning = true;
        this.postService.getOne(queryParams.id).subscribe(post => {
          this.isSpinning = false;
          this.post = post;
          this.fm.patchValue(post);
        }, error => this.isSpinning = false);
      } else {
        this.post = null;
        this.isSpinning = true;
        this.fm.patchValue({
          title: '',
          content: '',
          minutesRead: null,
          thumbnail: '',
          publish: false,
        });
        setTimeout(_ => this.isSpinning = false, 100);
      }
    });
  }

  initForm(post: Post = null) {
    this.fm = this.fb.group({
      title: this.fb.control(post ? post.title : '', Validators.required),
      content: this.fb.control(post ? post.content :'', Validators.required),
      minutesRead: this.fb.control(post ? post.minutesRead : null, Validators.required),
      thumbnail: this.fb.control(post ? post.thumbnail : ''),
      publish: this.fb.control(post ? post.publish : false),
    });
  }

  preview() {
  }

  publish() {
    this.fm.patchValue({ publish: true });
    this.submit();
  }

  saveDraft() {
    this.fm.patchValue({ publish: false });
    this.submit();
  }

  submit() {
    this.fm.markAllAsTouched();
    if (this.fm.invalid) {
      return;
    }
    this.isSavingDraft = true;
    this.isSpinning = true;
    this.isSaving = true;
    if (this.post?.id) {
      this.postService.update(this.post.id, this.fm.value).subscribe(post => {
          this.isSavingDraft = false;
          this.isSpinning = false;
          this.isSaving = false;
          this.notification.create(
            'success',
            'Success',
            'Update success',
            { nzPlacement: 'bottomRight' }
          );
          this.post = post;
        },
        error => {
          this.isSavingDraft = false;
        })
    } else {
      this.postService.create(this.fm.value).subscribe(post => {
          this.isSavingDraft = false;
          this.isSpinning = false;
          this.isSaving = false;
          this.notification.create(
            'success',
            'Success',
            'Create success',
            { nzPlacement: 'bottomRight' }
          );
          this.post = post;
          void this.router.navigate(['/admin/post-edit'], { queryParams: { id: post.id } })
        },
        error => {
          this.isSavingDraft = false;
        })
    }
  }

  deletePost() {
    this.isDeletingPost = true;
    this.postService.delete(this.post.id).subscribe(res => {
      this.isDeletingPost = false;
      this.notification.create(
        'success',
        'Success',
        'Delete success',
        { nzPlacement: 'bottomRight' }
      );
      void this.router.navigate(['/admin/post-list']);
    },
      error => this.isDeletingPost = false);
  }
}
