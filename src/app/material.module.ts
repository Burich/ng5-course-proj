import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatIconModule, MatTableModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
      MatButtonModule,
      MatInputModule,
      MatIconModule,
      MatTableModule,
      MatCardModule
    ],
  exports: [
      MatButtonModule,
      MatInputModule,
      MatIconModule,
      MatTableModule,
      MatCardModule
    ],
})
export class MaterialModule { }