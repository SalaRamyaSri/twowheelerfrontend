import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { VariantService } from 'src/app/services/variant.service';
import { GlobalConstants } from 'src/app/shared/global-constant';
import { VariantsComponent } from '../../variants/variants.component';

@Component({
  selector: 'app-variant-dialog',
  templateUrl: './variant-dialog.component.html',
  styleUrls: ['./variant-dialog.component.scss']
})
export class VariantDialogComponent implements OnInit {
  onAddVariant = new EventEmitter();
  onEditVariant = new EventEmitter();
  variantForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any="Add";
  responseMessage:any;
  companies:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private variantService:VariantService,
  private categoryService: CategoryService,
  private formBuilder:FormBuilder,
  public dialogRef:MatDialogRef<VariantsComponent>,
  private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.variantForm = this.formBuilder.group({
      // id:[null, [Validators.required]],
      title:[null, []],
      price:[null, []],
      // company:[null, []],
      company_id:[null, []],


    });
    this.getCompanies();
    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.variantForm.patchValue(this.dialogData.data);
    }
  }

  getCompanies(){
    this.categoryService.getCategorys().subscribe((response:any) => {
      // this.ngxService.stop();
      this.companies = response;
      console.log("These companies data --->   ", this.companies);
    }, (error) => {
      // this.ngxService.stop();
      if(error.error?.message) {
        this.responseMessage = error.error?.message;
      } else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }

  getVariants(){
    this.variantService.getVariants().subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddVariant.emit();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      this.dialogRef.close();
      // this.ngxService.stop();
      if(error.error?.message) {
        this.responseMessage = error.error?.message;
      } else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);

    })
  }

  handleSubmit(){
    if(this.dialogAction === "Edit") {
      this.edit();
    }else{
      this.add();
    }
  }

  
  add(){
    var formData = this.variantForm.value;
    var data = {
      // id: formData.id,
      title: formData.title,
      price: formData.price,
      // photo: formData.photo,
      company_id: formData.company_id,
    }
    this.variantService.add(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddVariant.emit();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      this.dialogRef.close();
      // this.ngxService.stop();
      if(error.error?.message) {
        this.responseMessage = error.error?.message;
      } else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });

  }

  edit(){
    var formData = this.variantForm.value;
    var data = {
      id:this.dialogData.data.id,
     title: formData.title,
    }
    this.variantService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditVariant.emit();
      this.onAddVariant.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      this.dialogRef.close();
      // this.ngxService.stop();
      if(error.error?.message) {
        this.responseMessage = error.error?.message;
      } else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }
}
