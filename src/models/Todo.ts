export class Todo {
  id: number;
  createdAt: string;
  constructor(public task: string, public done: boolean) {
    this.id = 0;
    this.createdAt = Date.now().toString();
  }
}
