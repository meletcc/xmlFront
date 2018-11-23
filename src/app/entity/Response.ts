export class Response {

  code: string;
  data: any;
  msg: string;

  constructor(opts: {
    code?: string,
    data?: any,
    msg?: string
  } = {}) {
    this.code = opts.code;
    this.data = opts.data;
    this.msg = opts.msg;
  }
}
