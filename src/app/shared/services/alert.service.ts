import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastr: ToastrService
  ) { }

    public success(msg:string,title?:string,options?:any){
      this.toastr.success(this.formatMessage(msg), title, options);
    }

    public error(msg,title?,options?){
      this.toastr.error(this.formatMessage(msg),title, options)
    }

    public info(msg,title?,options?){
      this.toastr.info(this.formatMessage(msg),title, options)
    }

    public warning(msg,title?,options?){
      this.toastr.warning(this.formatMessage(msg),title, options)
    }

    public formatMessage(msg){
      return `${new Date().toLocaleDateString()}: ${msg}`;
    }
}
