import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { finalize, Observable } from 'rxjs';

import Quill from 'quill';
import 'quill-emoji/dist/quill-emoji.js'

import Counter from 'src/app/counter';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirestoreService } from 'src/app/core/services/db/firestore/firestore.service';
import { New } from 'src/app/core/models/new';

// import { MdbDropdownDirective } from 'mdb-angular-ui-kit/dropdown';

Quill.register('modules/counter', Counter)

const fontList = ['principal', 'mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace'];
const fontNames = fontList.map(font => font.toLowerCase().replace(/\s/g, "-"));
const fonts = Quill.import('attributors/class/font');
// // We do not add Aref Ruqaa since it is the default
fonts.whitelist = fontNames
Quill.register(fonts, true)

@Component({
  selector: 'app-create',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent implements OnInit {
  // @ViewChild('dropdown') dropdown!: MdbDropdownDirective;

  form!: FormGroup;
  submitted = false;
  clicked = false;
  isLoading!: boolean;
  name$: string = "";
  image$!: Observable<any>;
  error: boolean = false;
  errorRequired: boolean = false;
  errorMinLength: boolean = false;
  public user: boolean = false;
  public editorStyle = {};
  public quill!: any;
  public options = {};
  public delta: any;
  public text!: string;
  public content: any;
  public categories = [];
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

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router,
              private storage: AngularFireStorage, private db: FirestoreService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.hasUser();
    this.editorStyle = {
      height: '20px'
    };
    let fontStyles = "";
    fontList.forEach(function(font) {
      let fontName = font.toLowerCase().replace(/\s/g, "-");
      fontStyles += ".ql-snow .ql-picker.ql-font .ql-picker-label[data-value=" + fontName + "]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=" + fontName + "]::before {" +
        "content: '" + font + "';" +
        "font-family: '" + font + "', sans-serif;" +
        "}" +
        ".ql-font-" + fontName + "{" +
        " font-family: '" + font + "', sans-serif;" +
        "}";
    });
    var node = document.createElement('style');
    node.innerHTML = fontStyles;
    document.body.appendChild(node);
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

  createNew(values: any) {
    this.clicked = true;
    let text = this.quill.container.firstChild.innerHTML
    if (text === "<p><br></p>") {
      this.error = true;
      this.errorRequired = true;
    } else {
      this.error = false;
      this.errorRequired = false;
    }
    if (this.form.valid && !this.error) {
      this.submitted = true;
      this.isLoading = true;
      let time = Date.now();
      let currentDate = new Date(time);
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let document= ' ';
      const charactersLength = characters.length;
      for ( let i = 0; i < 20; i++ ) {
        document += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      let newForm: New = {
        title: values.title,
        image: this.name$,
        categories: values.category,
        date: currentDate,
        body: text
      };
      this.db.createCollection('news', document, newForm)
        .then(() => {
          this.router.navigate(['/noticias'])
        })
        .catch((err) => {
          console.log(err)
        })
      this.isLoading = false;
    }
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.name$ = file.name;
    const fileRef = this.storage.ref(this.name$);
    const task = this.storage.upload(this.name$, file);

    task.snapshotChanges()
      .pipe(finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe((url: any) => {
          this.form.get('image')?.setValue(url);
        })
      }))
      .subscribe();
  }

  hasUser() {
    this.authService.hasUser().
      subscribe(res => {
        if(res && res.uid) {
          this.user = true;
        }
      }
    );
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
      // body: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  get f() { return this.form.controls; }

}
