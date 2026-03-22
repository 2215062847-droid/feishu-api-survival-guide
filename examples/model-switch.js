// 模型切换逻辑
class ModelSwitcher {
  constructor() {
    this.currentModel = 'astroncodingplan/astron-code-latest';
    this.fallbackModels = [
      'moonshot/kimi-k2.5',
      'qwen-portal/coder-model',
      'dseepseek/deepseek-chat'
    ];
    this.currentIndex = 0;
  }
  
  // 检测API错误
  detectError(error) {
    if (error.code === 10012 || error.status === 403) {
      return true;
    }
    return false;
  }
  
  // 切换到备用模型
  switchToFallback() {
    if (this.currentIndex < this.fallbackModels.length) {
      this.currentModel = this.fallbackModels[this.currentIndex];
      this.currentIndex++;
      console.log(`切换到备用模型: ${this.currentModel}`);
      return true;
    }
    return false;
  }
  
  // 重置到主模型
  reset() {
    this.currentModel = 'astroncodingplan/astron-code-latest';
    this.currentIndex = 0;
  }
}

module.exports = ModelSwitcher;
