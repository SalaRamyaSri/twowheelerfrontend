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
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.scss']
})
export class VariantsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'price',  'edit'];
  dataSource: any;
  responseMessage:any;

  constructor(private variantService: VariantService,
    // private ngxService:NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
      // this.ngxService.start();
      this.tableData();
      // this.getVariants();
  }

  tableData(){
    this.variantService.getVariants().subscribe((response:any)=> {
      // this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
     },  (error:any)=>{
       // this.ngxService.stop();
       console.log(error);
       if(error?.error.message){
         this.responseMessage = error?.error.message;
       } else{
         this.responseMessage = GlobalConstants.genericError;
       }
       this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error)
     });
  }

  applyFilter(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width= "850px";
    const dialogRef = this.dialog.open(VariantDialogComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    //To refresh the table
    const sub = dialogRef.componentInstance.onAddVariant.subscribe(()=> {
      this.tableData();
    });
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values
    }
    dialogConfig.width= "850px";
    const dialogRef = this.dialog.open(VariantDialogComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    //To refresh the table
    const sub = dialogRef.componentInstance.onEditVariant.subscribe(()=> {
      this.tableData();
    })
  }

  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Delete ' + values.title+' variant',
    }
    dialogConfig.width= "850px";
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
     //To refresh the table
     const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(()=> {
      // this.ngxService.start();
      this.deleteVariant(values.id);
      dialogRef.close();
    })
  }

  deleteVariant(id:any){
  this.variantService.delete(id).subscribe((response:any)=> {
      // this.ngxService.stop();
      this.tableData();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
  }, (error:any)=>{
    // this.ngxService.stop();
    console.log(error);
    if(error?.error.message){
      this.responseMessage = error?.error.message;
    } else{
      this.responseMessage = GlobalConstants.genericError;
    }
    this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error)
  });
  }

  onChange(status:any, id:any){
    var data = {
      status : status.toString(),
      id:id
    }
    this.variantService.updateStatus(data).subscribe((response:any)=> {
    // this.ngxService.stop();
    this.responseMessage = response?.message;
    this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error:any)=>{
      // this.ngxService.stop();
      console.log(error);
      if(error?.error.message){
        this.responseMessage = error?.error.message;
      } else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error)
    });
  }


  // variants: Variant[] = [];


  // private getVariants(){
  //   this.variantService.getVariantsList().subscribe(data => {
  //     this.variants = data;
  //   });
  // }

  // variantDetails(id: number){
  //   this.router.navigate(['variant-details', id]);
  // }

  // updateVariant(id: number){
  //   this.router.navigate(['update-variant', id]);
  // }

  // deleteVariant(id: number){
  //   this.variantService.deleteVariant(id).subscribe( data => {
  //     console.log(data);
  //     this.getVariants();
  //   })
  // }

}
