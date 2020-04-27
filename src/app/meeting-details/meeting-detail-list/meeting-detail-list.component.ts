import { MeetingDetail } from './../../shared/meeting-detail.model';
import { MeetingDetailService } from './../../shared/meeting-detail.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-meeting-detail-list',
  templateUrl: './meeting-detail-list.component.html',
  styles: []
})
export class MeetingDetailListComponent implements OnInit {

  constructor(private service: MeetingDetailService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(mt: MeetingDetail) {
    this.service.formData = Object.assign({}, mt);
  }

  onDelete(meetingId) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteMeetingDetail(meetingId)
        .subscribe(res => {
          // debugger;
          this.service.refreshList();
          this.toastr.warning('Deleted successfully', 'Meeting Detail Register');
        },
          err => {
            // debugger;
            console.log(err);
          });
    }
  }

}
