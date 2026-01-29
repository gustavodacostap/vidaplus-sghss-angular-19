import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-layout',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './dialog-layout.component.html',
  styleUrl: './dialog-layout.component.scss',
})
export class DialogLayoutComponent {
  private dialogRef = inject(MatDialogRef);

  @Input({ required: true }) dialogTitle!: string;

  /** Se existir, mostra botão de ação */
  @Input() confirmLabel?: 'Confirmar' | 'Salvar';

  /** Função executada ao confirmar */
  @Input() onConfirm?: () => void;

  /** Controle de disabled do botão */
  @Input() confirmDisabled = false;

  @Input() onEdit?: () => void;

  @Input() containerClasses?: string;

  close(): void {
    this.dialogRef.close();
  }

  edit() {
    this.onEdit?.();
    this.close();
  }

  confirm(): void {
    this.onConfirm?.();
    this.close();
  }

  get hasConfirmButton(): boolean {
    return !!this.confirmLabel;
  }
}
