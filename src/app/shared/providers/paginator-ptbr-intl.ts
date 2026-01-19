import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class PaginatorPtBrIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = 'Primeira página';
  lastPageLabel = 'Última página';
  itemsPerPageLabel = 'Itens por página:';
  nextPageLabel = 'Próxima página';
  previousPageLabel = 'Página anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return '0 de 0';
    }

    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex + 1} – ${endIndex} de ${length}`;
  }
}
