import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constant';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any = FormGroup;
  responseMessage:any;

  error$: Observable<string>;

  private errorSubject = new Subject<string>();

//  user = {
//   userId: "Tom",
//   pwd: "Hanks",
//   role:""
// };

  constructor(private httpService: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    // private ngxService:NgxUiLoaderService,
    private dialogRef:MatDialogRef<LoginComponent>,
    private snackbarService: SnackbarService) {
    this.error$ = this.errorSubject.asObservable();
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      userid:  [null, Validators.required],
      pwd: [null, Validators.required],
      role: [null, Validators.required],
    });
  }

  handleSubmit(){
     // this.ngxService.start();
     var formData = this.loginForm.value;
     var data = {
      //  email: formData.email,
      userid: formData.userid,
      pwd: formData.pwd,
      role: formData.role
     }
     this.userService.login(data).subscribe((response:any) => {
       // this.ngxService.stop();
      //  this.responseMessage = response?.message;
       this.dialogRef.close();
       localStorage.setItem('token',response.token);
       this.router.navigate(['/bike-rental/dashboard']);

       this.snackbarService.openSnackBar(this.responseMessage, "");
 
     }, (error)=> {
       // this.ngxService.stop();
       if(error.error?.message){
         this.responseMessage = error.error?.message;
       } else {
         this.responseMessage = GlobalConstants.genericError;
       }
       this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
     })
  }

  // const BASEURL=process.env.REACT_APP_BACKEND_URL
  // const dispatch=useDispatch()
  // const history=useHistory()    

  // const handleInput=(e)=>{
  //     setUser({...user,[e.target.name]:e.target.value})
  // }
  // handleInput(){

  // }
  //  handleSubmit12(e: any) {
  //     e.preventDefault() 
  //     if(this.user.userId==="" || this.user.pwd==="" || this.user.role ===""){
  //       // toast.error("Please fill all required fields")
  //       alert("Please fill all required fields")
  //         return
  //     } 
  //     console.log(this.user)
  //     // let url=BASEURL+"api/customers/validate";
  //     let url = "";
  //     if(this.user.role==="Admin"){
  //       url = "";
  //         // url=BASEURL+"api/admin/validate";
  //     }

  //   // this.login( url, this.user);
  //     console.log(url)
  //     this.httpService.post(url, this.user)
  //     // .then(resp=>{
  //         // console.log(resp.data)
  //         // sessionStorage.setItem("userid",resp.data.userid);
  //         // sessionStorage.setItem("uname",resp.data.uname);
  //         // sessionStorage.setItem("role", this.user.role);
  //         // dispatch({type:'IsLoggedIn'})
  //         // // toast.success("Login successfull")
  //         // alert("Login successfull")
  //         // if(this.user.role==="Admin"){
  //         //     history.push('/dashboard')
  //         // }else{
  //         //     history.push('/')
  //         // }
  //     // }).catch(error=>{
  //     //     console.log("Error",error)
  //     //     alert("Invalid username or password")
  //         // toast.error("Invalid username or password")
  //     // })           
  // }


  // login(url, user): Observable<any> {
    // this.resetError();

    // const headers = new HttpHeaders({ 'g-recaptcha-response': reCaptchaToken });

    // return this.httpService
    //   .post<ILoginResponse>(
    //     API_PATH.login,
    //     { data },
    //     {
    //       headers,
    //       params: {
    //         goto: redirectUri,
    //       },
    //       withCredentials: true,
    //     },
    //   )
    //   .pipe(
    //     catchError((errorResponse: HttpErrorResponse) => {
    //       return throwError(errorResponse);
    //     }),
    //   );
  // }

  // private resetError(): void {
  //   this.errorSubject.next(null);
  // }
}
