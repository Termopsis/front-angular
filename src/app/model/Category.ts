export class Category {
  id: number;
  title: string;
  completedCount?: number;
  uncompletedCount?: number;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}
