import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../@core/services/post.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
  providers: [NzNotificationService]
})
export class PostEditComponent implements OnInit {

  fm!: FormGroup;
  isSavingDraft: boolean = false;
  isPublishing: boolean = false;

  constructor(private readonly fb: FormBuilder,
              private readonly postService: PostService,
              private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.fm = this.fb.group({
      title: this.fb.control('', Validators.required),
      content: this.fb.control('', Validators.required),
      minutesRead: this.fb.control(null, Validators.required),
      thumbnail: this.fb.control(''),
      publish: this.fb.control(false),
    });
  }

  preview() {
  }

  publish() {
    this.fm.patchValue({ publish: true });
    this.create();
  }

  saveDraft() {
    this.fm.patchValue({ publish: false });
    this.create();
  }

  create() {
    this.fm.markAllAsTouched();
    if (this.fm.invalid) {
      return;
    }
    this.isSavingDraft = true;
    this.postService.create(this.fm.value).subscribe(res => {
        this.isSavingDraft = false;
        this.notification.create(
          'success',
          'Success',
          'Save success',
          { nzPlacement: 'bottomRight' }
        );
        console.log(res);
      },
      error => {
        this.isSavingDraft = false;
      })
  }
}
