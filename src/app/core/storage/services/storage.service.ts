import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  set<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  add<T extends { id?: number }>(key: string, item: T): T {
    const data: T[] = this.get<T[]>(key) || [];

    const newItem = {
      ...item,
      id: this.generateId(),
    };

    data.push(newItem);
    this.set(key, data);

    return newItem;
  }

  // Atualiza um item no array
  update<T extends { id: number }>(key: string, item: T): T {
    const data: T[] = this.get<T[]>(key) || [];
    const index = data.findIndex((i) => i.id === item.id);
    if (index >= 0) {
      data[index] = item;
      this.set(key, data);
    }
    return item;
  }

  // Remove um item do array
  delete<T extends { id: string }>(key: string, id: string): void {
    const data: T[] = this.get<T[]>(key) || [];
    const filtered = data.filter((i) => i.id !== id);
    this.set(key, filtered);
  }

  private generateId(): number {
    return Date.now() + Math.floor(Math.random() * 1000);
  }
}
