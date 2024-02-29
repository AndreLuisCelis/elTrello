import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-inlineform',
  templateUrl: './inlineform.component.html',
  styleUrls: ['./inlineform.component.scss']
})
export class InlineformComponent implements OnInit {

  @Input() title: string = '';
  @Input() defaultText: string = 'Not defined';
  @Input() hasButton: boolean = false;
  @Input() buttonText: string = 'Submit';
  @Input() inputPlaceholder: string = '';
  @Input() inputType: string = 'input';

  @Output() handleSubmit = new EventEmitter<string>();

  isEditing: boolean = false;
  form = this.fb.group({
    title: [''],
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
  }

  activeEditing(): void {
    if (this.title) {
      this.form.patchValue({ title: this.title });
    }
    this.isEditing = true;
  }

  onSubmit(): void {
    if (this.form.value.title) {
      this.handleSubmit.emit(this.form.value.title);
    }
    this.isEditing = false;
    this.form.reset();
  }

}
