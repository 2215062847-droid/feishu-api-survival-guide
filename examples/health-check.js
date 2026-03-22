// 健康检查机制
class HealthChecker {
  constructor(models) {
    this.models = models;
    this.healthStatus = {};
  }
  
  // Ping单个模型
  async pingModel(modelName) {
    try {
      const startTime = Date.now();
      // 这里应该是实际的API调用
      // const response = await callModelAPI(modelName, 'ping');
      const endTime = Date.now();
      
      return {
        model: modelName,
        status: 'healthy',
        latency: endTime - startTime,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        model: modelName,
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
  
  // 检查所有模型
  async checkAll() {
    const results = await Promise.all(
      this.models.map(model => this.pingModel(model))
    );
    
    results.forEach(result => {
      this.healthStatus[result.model] = result;
    });
    
    return results;
  }
  
  // 获取健康模型列表
  getHealthyModels() {
    return Object.entries(this.healthStatus)
      .filter(([_, status]) => status.status === 'healthy')
      .map(([model, _]) => model);
  }
  
  // 定期检查
  startPeriodicCheck(intervalMs = 60000) {
    setInterval(async () => {
      await this.checkAll();
      console.log('健康检查完成:', this.getHealthyModels());
    }, intervalMs);
  }
}

module.exports = HealthChecker;
