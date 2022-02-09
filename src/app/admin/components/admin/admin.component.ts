import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Quill from 'quill';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import Counter from 'src/app/counter';

Quill.register('modules/counter', Counter)

const font = Quill.import('formats/font')
// We do not add Aref Ruqaa since it is the default
font.whitelist = ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
Quill.register(font, true)

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  form!: FormGroup;

  editorStyle = {
    height: '200px',
  };

  public quillObj = new Quill('#quilljs-container', {
    modules: {
      toolbar: '#toolbar-container'
    },
    placeholder: 'This is a font test...',
    theme: 'snow'
  });

  public toolbarOptions = [
    [{ 'font': ['', 'times-new-roman', 'arial'] }],

        ['clean']                                         // remove formatting button
  ];

  public quill = new Quill('#editor', {
    modules: {
      toolbar: this.toolbarOptions
    },
    theme: 'snow'
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  test(values: any) {
    console.log(values.name, values.email, values.message);
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/home']);
      });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

}
