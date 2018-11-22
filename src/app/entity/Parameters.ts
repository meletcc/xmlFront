export class Parameters {

  name: string;

  description: string;

  type: string;

  tips: string;

  value: string;

  constructor(ops: {
    description?: string,
    name?: string,
    type?: string,
    tips?: string,
    value?: string
  } = {}) {
    this.description = ops.description;
    this.name = ops.name || '';
    this.type = ops.type || '';
    this.tips = ops.tips || '';
    this.value = ops.value || '';
  }


}
