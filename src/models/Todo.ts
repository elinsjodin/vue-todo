export class Todo {
  id: number;
  constructor(public task: string, public done: boolean) {
    this.id = Date.now();
  }
}
