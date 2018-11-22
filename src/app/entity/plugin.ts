export class Plugin {
  /**
   * 插件id
   */
  pluginId: String;
  /**
   * 参数功能说明
   */
  pluginDescription: String;
  /**
   * 插件主体
   */
  pluginBody: String;
  /**
   * 插件备份
   */
  pluginBack: String;
  /**
   * 插件参数{JSON格式}
   */
  pluginParameterStr: String;
  /**
   * 所属用户
   */
  userId: String;

  constructor(ops: {
    pluginDescription?: string,
    pluginBody?: string,
    pluginBack?: string,
    pluginParameterStr?: string
  } = {}) {
    this.pluginDescription = ops.pluginDescription || '';
    this.pluginBody = ops.pluginBody || '';
    this.pluginBack = ops.pluginBack || '';
    this.pluginParameterStr = ops.pluginParameterStr || '';
  }

}
