import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

export const EXE_COUNTER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UploadImageSingleComponent),
  multi: true,
};

@Component({
  selector: 'app-upload-image-single',
  templateUrl: './upload-image-single.component.html',
  styleUrls: ['./upload-image-single.component.css'],
  providers: [EXE_COUNTER_VALUE_ACCESSOR],
})
export class UploadImageSingleComponent implements ControlValueAccessor {
  constructor(private messageService: NzMessageService) {}

  get _imageURLToLoad() {
    return this.imageURLToLoad;
  }

  set _imageURLToLoad(value: string) {
    this.imageURLToLoad = value;
    this.propagateOnChange(this.imageURLToLoad);
  }
  writeValue(value: any): void {
    if (value) {
      this._imageURLToLoad = value;
    }
  }
  propagateOnChange: (value: any) => void = (_: any) => {};
  propagateOnTouched: (value: any) => void = (_: any) => {};

  registerOnChange(fn: any): void {
    this.propagateOnChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateOnTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  // image upload

  @Input() uploadUrl = '';
  @Input() binaryName = '';
  @Input() preURLForLoad = '';
  @Input() imageURLToLoad = '';

  ngOnInit(): void {}
  loading = false;

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    console.log(file);
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.messageService.error('请上传jpg或png格式的照片.');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.messageService.error('图片要小于2MB.');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: NzUploadChangeParam): void {
    console.log(info);

    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        {
          // Get this url from response in real world.
          console.log(info);
          this.getBase64(info.file!.originFileObj!, (img: string) => {
            this.loading = false;
            this.writeValue(info.file.response.data.name);
          });
        }
        break;
      case 'error':
        this.messageService.error('网络错误');
        this.loading = false;
        break;
    }
  }

}
