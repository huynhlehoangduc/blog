import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../@core/services/post.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../../../../@core/interfaces/post';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { environment } from '../../../../../../../environments/environment';
import { FileManagementService } from '../../../../../@core/services/file-management.service';
import { S3UploadResponse } from '../../../../../../@core/interfaces/s3-upload-response';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
  providers: [NzNotificationService]
})
export class PostEditComponent implements OnInit {

  POST_S3_ENDPOINT = `${environment.apiUrl}/${this.fileManagementService.API_ENDPOINT}/post-img-s3`;

  fm!: FormGroup;
  post: Post = null;

  isSaving: boolean = false;
  isSavingDraft: boolean = false;
  isPublishing: boolean = false;
  isSpinning: boolean = false;
  isDeletingPost: boolean = false;
  isUploadingThumbnail: boolean = false;

  @ViewChild('tinymce') tinymce;
  tinymceOptions;

  constructor(private readonly fb: FormBuilder,
              private readonly postService: PostService,
              private readonly notification: NzNotificationService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly fileManagementService: FileManagementService) { }

  ngOnInit(): void {
    this.initForm();
    this.initTinyMCEOption();
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.id) {
        this.isSpinning = true;
        this.postService.getOne(queryParams.id).subscribe(post => {
          this.isSpinning = false;
          this.post = post;
          this.fm.patchValue(post);
        }, _ => this.isSpinning = false);
      } else {
        this.post = null;
        this.isSpinning = true;
        this.fm.patchValue({
          title: '',
          content: '',
          minutesRead: null,
          thumbnail: '',
          publish: false,
          description: '',
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
      description: this.fb.control(post ? post.description : null, Validators.required),
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
        _ => {
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
      _ => this.isDeletingPost = false);
  }

  handleChangeThumbNail(info: NzUploadChangeParam): void {
    switch (info.file.status) {
      case 'uploading':
        this.isUploadingThumbnail = true;
        break;
      case 'done':
        const response: S3UploadResponse = info.file.response;
        this.fm.patchValue({ thumbnail: response.Location });
        this.isUploadingThumbnail = false;
        break;
      case 'error':
        this.isUploadingThumbnail = false;
        break;
    }
  }

  private initTinyMCEOption() {
    this.tinymceOptions = {
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
      images_upload_handler: (blobInfo, success, failure) => {
        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.blob().filename);
        const self = this;
        // REF: https://youtu.be/wNqwExw-ECw
        self.fileManagementService.postImgS3(formData).subscribe(
          (res: S3UploadResponse) => {
            /*console.log('tinymce res: ', res);
            const json = JSON.parse(JSON.stringify(res));*/
            success(res.Location);
          }, (err) => {
            if (err.status !== 200) {
              self.tinymce.editor.notificationManager.open({
                text: 'HTTP Error: ' + err.status,
                type: 'error',
                timeout: 5000,
                closeButton: true
              });
              return;
            }
          });

      }
    };
  }
}
