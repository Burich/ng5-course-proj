import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatIconModule, MatTableModule, MatCardModule, MatAutocompleteModule } from '@angular/material';

@NgModule({
  imports: [
      MatButtonModule,
      MatInputModule,
      MatIconModule,
      MatTableModule,
      MatCardModule,
      MatAutocompleteModule
    ],
  exports: [
      MatButtonModule,
      MatInputModule,
      MatIconModule,
      MatTableModule,
      MatCardModule,
      MatAutocompleteModule
    ],
})
export class MaterialModule { }