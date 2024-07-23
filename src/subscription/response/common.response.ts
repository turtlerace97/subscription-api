export class CommonResponse<T> {
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}
