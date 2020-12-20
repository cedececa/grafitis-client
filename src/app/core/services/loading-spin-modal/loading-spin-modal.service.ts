import { Injectable } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LoadingSpinModalComponent } from 'src/app/components/loading-spin-modal/loading-spin-modal.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinModalService {
  private modalRef:NzModalRef = null;
  constructor(private nzModalService: NzModalService) {}
  open() {
    this.modalRef = this.nzModalService.create({
      nzContent: LoadingSpinModalComponent,
      nzWidth: '200px',
      nzFooter: null,
      nzClosable:false,
      nzMaskClosable:false
    });
  }
  close(){
    this.modalRef.close()
  }
}
