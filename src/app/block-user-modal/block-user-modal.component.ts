import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Exercise} from "../domain/exercise";
import {Block} from "../domain/block";
import {ExerciseService} from "../services/exercise.service";
import {BlockScrollStrategy} from "@angular/cdk/overlay";
import {BlockService} from "../services/block_user.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {CheckBlock} from "../domain/check_block";


interface Level{
  key: string, value: string
}
@Component({
  selector: 'app-block-user-modal',
  templateUrl: './block-user-modal.component.html',
  styleUrls: ['./block-user-modal.component.scss']
})
export class BlockUserModalComponent implements OnInit {
  checkBlock : boolean;
  blockDate: string;
  public block: Block = new Block();
  display_all = false;
  myForm: FormGroup = new FormGroup({
    "levelNumber": new FormControl({disabled: true}, Validators.required),
  })
  constructor(public dialogRef: MatDialogRef<BlockUserModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { id: number },
              private blockService: BlockService,public snackBar: MatSnackBar) {}
  public levels: Level[] = [
    {key: "Час", value: "Час"},
    {key: "День", value: "День"},
    {key: "Неделя", value: "Неделя"},
    {key: "Навсегда", value: "Навсегда"}
  ]

  ngOnInit(): void {
    this.display_all = false;
  }
  onClose(): void{
    this.dialogRef.close();
  }
  displayAll(): void{
    this.display_all=true;
  }
  onBlock() {
    this.blockService.checkBlock(this.data.id).subscribe(el => {
      this.checkBlock = el.checkBlock;
      this.blockDate = el.blockDate;
      console.log(this.blockDate)
      if (this.checkBlock) {
        this.snackBar.open("БЛОКИРОВАН", "БЛОКИРОВАН", {
          duration: 2000,
        });
      } else {
        this.block.user_id = this.data.id;
        this.blockService.blockUser(this.block).subscribe();
        setTimeout("window.location.reload()",1000);
        this.snackBar.open("Пользователь успешно заблокирован", "", {
          duration: 2000,
        });
      }


    })

  }
}
