import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Quill from 'quill';
import 'quill-emoji/dist/quill-emoji.js'

import { AuthService } from 'src/app/core/services/auth/auth.service';
import Counter from 'src/app/counter';

import { MdbDropdownDirective } from 'mdb-angular-ui-kit/dropdown';

Quill.register('modules/counter', Counter)

const fontList = ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace'];
// const fontNames = fontList.map(font => font.toLowerCase().replace(/\s/g, "-"));
const fonts = Quill.import('attributors/class/font');
// // We do not add Aref Ruqaa since it is the default
fonts.whitelist = fontList
Quill.register(fonts, true)

@Component({
  selector: 'app-create',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent implements OnInit {
  @ViewChild('dropdown') dropdown!: MdbDropdownDirective;

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
      [{ 'font': fonts.whitelist }],
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
    this.editorStyle = {
      height: '20px'
    };
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
    console.log(values.title, values.category, values.body);
    this.text = this.quill.container.firstChild.innerHTML;
    document.getElementById("text")!.innerHTML = this.text;
    console.log(this.quill.container.firstChild.innerHTML);
    console.log(this.dropdown.toggle());
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/home']);
      });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      body: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

}
