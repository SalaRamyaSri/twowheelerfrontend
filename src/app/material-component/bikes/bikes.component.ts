import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Variant } from 'src/app/interfaces/variant';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { VariantService } from 'src/app/services/variant.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/global-constant';
import { CategoryComponent } from '../dialog/category/category.component';
import { VariantDialogComponent } from '../dialog/variant-dialog/variant-dialog.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BikeService } from 'src/app/services/bike.service';
import { CategoryService } from 'src/app/services/category.service';
import { saveAs } from 'file-saver'


@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.scss']
})
export class BikesComponent implements OnInit {
  displayedColumns: string[] = ['modelYear', 'status', 'variant_id', 'edit'];
  dataSource: any;
  manageBikeForm:any = FormGroup;
  companies:any= [];
  variants:any= [];
  price: any;
  totalAmount: number =0;
  responseMessage:any;

  bikes: Variant[] = [];

  constructor(  private formBuilder:FormBuilder,
    private categoryService:CategoryService,
    private bikeService: BikeService,
    // private ngxService:NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    // this.ngxService.start();
    this.getCategorys();
    this.manageBikeForm = this.formBuilder.group({
      // id:[null, [Validators.required]],
      modelYear:[null, []],
      variant_id:[null,[]],
      // company:[null, [Validators.required]],
      status:[null, []],
      // price:[null, [Validators.required]],
    });

  }

  getCategorys(){
    this.categoryService.getCategorys().subscribe((response:any) => {
      // this.ngxService.stop();
      this.companies = response;
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

  getVariantsByCompany(value:any){
    this.bikeService.getVariantsByCompany(value.id).subscribe((response:any) => {
      this.variants = response;
      // id', 'modelYear', 'variant', 'status', 'edit
      // this.manageBikeForm.controls['modelYear'].setValue('');
      this.manageBikeForm.controls['modelYear'].setValue('');
      this.manageBikeForm.controls['variant_id'].setValue('');
      this.manageBikeForm.controls['status'].setValue('');
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

  getVariantDetails(value:any){
   this.bikeService.getById(value.id).subscribe((response:any) => {
    this.price = response.price;
    this.manageBikeForm.controls['id'].setValue('1236589');
    this.manageBikeForm.controls['modelYear'].setValue('2023');
    this.manageBikeForm.controls['variant'].setValue(response.id);
    this.manageBikeForm.controls['status'].setValue('Available');
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

  setQuantity(value:any){
    var temp = this.manageBikeForm.controls['status'].value;
    if(temp === "Available"){
      // this.manageBikeForm.controls['total'].setValue(this.manageBikeForm.controls['status'].value * this.manageBikeForm.controls['status'].value);
    } else if(temp != "") {
// this.manageBikeForm.controls['total'].setValue(this.manageBikeForm.controls['status'].value * this.manageBikeForm.controls['status'].value);
    }
  }

  validateProductAdd(){
    if(this.manageBikeForm.controls['status'].value === "Not Available"){
      return true;
    } else{
      return false;
    }
  }

  validateSubmit(){
    // if(this.manageBikeForm.controls['id'].value === null || 
    // this.manageBikeForm.controls['modelYear'].value === null ||
    // this.manageBikeForm.controls['variant'].value === null ||
    // this.manageBikeForm.controls['status'].value === null){
    //   return true;
    // } else{ 
    //   return false;
    // }
  }

  add(){
    var formData = this.manageBikeForm.value;
    var variantName = this.dataSource.find((e:{id:number;}) => e.id === formData.variant.id);
    if(variantName === undefined){
      this.totalAmount = this.totalAmount + formData.total;
      this.dataSource.push({
        id: formData.variant.id, 
        title:formData.variant.title,
        company_id: formData.company_id,
        price: formData.price
      });
      this.dataSource = [...this.dataSource];
      this.snackbarService.openSnackBar(GlobalConstants.variantAdded, "success");
    } else {
      this.snackbarService.openSnackBar(GlobalConstants.variantExistError, GlobalConstants.error);
    }
  }

  handleDeleteAction(value:any, element:any){
    this.totalAmount = this.totalAmount - element.total;
    this.dataSource.splice(value, 1);
    this.dataSource = [... this.dataSource];
  }

  submitAction(){
   // this.ngxService.start();
    var formData = this.manageBikeForm.value;
    var data = {
      // 'id', 'modelYear', 'variant', 'status',
      // id : formData.id,
      modelYear : formData.modelYear,
      variant_id : formData.variant_id,
      status : formData.status,
      // totalAmount: formData.totalAmount,
      variantDetails: JSON.stringify(this.dataSource)
    }
    this.bikeService.generateReport(data).subscribe((response:any) => {
      this.downloadFile(response?.uuid);
      this.manageBikeForm.reset();
      this.dataSource = [];
      this.totalAmount = 0;
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

  downloadFile(fileName:any){
    var data = {
      uuid: fileName,

    }
    this.bikeService.getPDF(data).subscribe((response:any)=>{
      saveAs(response, fileName+ '.pdf');
      // this.ngxService.stop();
    })
  }
}
