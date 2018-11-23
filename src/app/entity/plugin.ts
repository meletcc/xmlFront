import {Parameters} from './Parameters';

export class Plugin {
  /**
   * 插件id
   */
  pluginId: string;
  /**
   * 参数功能说明
   */
  pluginDescription: string;
  /**
   * 插件主体
   */
  pluginBody: string;
  /**
   * 插件备份
   */
  pluginBack: string;
  /**
   * 插件参数{JSON格式}
   */
  pluginParameterStr: string;
  /**
   * 所属用户
   */
  userId: String;

  constructor(ops: {
    pluginDescription?: string,
    pluginBody?: string,
    pluginBack?: string,
    pluginParameterStr?: string;
  } = {}) {
    this.pluginDescription = ops.pluginDescription || '';
    this.pluginBody = ops.pluginBody || '';
    this.pluginBack = ops.pluginBack || '';
    this.pluginParameterStr = ops.pluginParameterStr || '';
  }

}
