export class Page {
  currentPage: number; // 当前页数
  pageCount: number; // 总页数
  currtNum: number; // 每页展示多少条
  getCurrtNum: number; // 当前获得条数
  totleNum: number; // 总条数
  startNum: number; // 请求到的开始条数
  constructor(opts: {
    currentPage?: number;
    pageCount?: number;
    currtNum?: number;
    getCurrtNum?: number;
    totleNum?: number;
    startNum?: number;
  } = {}) {
    this.currentPage = opts.currentPage || 1;
    this.pageCount = opts.pageCount || 1;
    this.currtNum = opts.currtNum || 15;
    this.totleNum = opts.currtNum || 0;
    this.getCurrtNum = opts.getCurrtNum || 0;
    this.startNum = opts.startNum || 0;
  }
}


