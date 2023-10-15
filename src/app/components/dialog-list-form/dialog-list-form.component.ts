import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatDialogModule,
  MatDialogConfig,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface DialogDataProps {
  type: 'Create' | 'Update';
  data?: {
    id: string;
    title: string;
    content: string;
  };
}

export const DialogListFormComponentConfig: MatDialogConfig = {
  autoFocus: false,
  disableClose: true,
};

@Component({
  selector: 'app-dialog-list-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './dialog-list-form.component.html',
  styleUrls: ['./dialog-list-form.component.scss'],
})
export class DialogListFormComponent implements OnInit {
  @Output() saveHandler: EventEmitter<any> = new EventEmitter<any>();

  modalData: DialogDataProps;
  dialogForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogDataProps,
    public dialogRef: MatDialogRef<DialogListFormComponent>,
    private fb: FormBuilder
  ) {
    this.modalData = data;

    this.dialogForm = this.fb.group({
      title: [''],
      content: [''],
    });
  }

  ngOnInit(): void {
    if (this.modalData.type === 'Update' && this.modalData.data) {
      this.dialogForm.patchValue({
        title: this.modalData.data.title,
        content: this.modalData.data.content,
      });
    }
  }

  saveDialog() {
    if (this.dialogForm.valid) {
      this.saveHandler.emit(this.dialogForm.value);
      this.dialogRef.close();
    }
  }
}
