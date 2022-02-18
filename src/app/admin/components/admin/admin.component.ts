import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Quill from 'quill';
import 'quill-emoji/dist/quill-emoji.js'

import { AuthService } from 'src/app/core/services/auth/auth.service';
import Counter from 'src/app/counter';

Quill.register('modules/counter', Counter)

// const font = Quill.import('formats/font')
// // We do not add Aref Ruqaa since it is the default
// font.whitelist = ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
// Quill.register(font, true)

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  form!: FormGroup;
  public editorStyle = {};
  public quill!: any;
  public options = {};
  public delta: any;
  public text!: string;
  public content: Event | undefined;
  public toolbarOptions = {
    container: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      ['link', 'image', 'video'],
      ['code-block'],
      [{ 'align': [] }],
      [ 'emoji' ],

      // [ 'clean' ]                                         // remove formatting button
    ],
    handlers: {'emoji': function() {}}
  };

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.options = {
      // debug: 'info',
      modules: {
        "emoji-toolbar": true,
        "emoji-textarea": true,
        "emoji-shortname": true,
        toolbar: this.toolbarOptions,
      },
      placeholder: 'Compose an epic...',
      // readOnly: true,
      theme: 'snow'
    };
    this.quill = new Quill('#editor', this.options);
  }

  test(values: any) {
    // console.log(values.name, values.email, values.message);
    this.text = this.quill.container.firstChild.innerHTML;
    document.getElementById("text")!.innerHTML = this.text;
    // let length = this.quill.getLength();
    // this.text = this.quill.getText(0, length);
    // for (let item of this.delta) {
    //   console.log(item)
    // }
    console.log(this.quill.container.firstChild.innerHTML);
    // let toolbar = this.quill.getModule('toolbar');
    // console.log(toolbar);
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
