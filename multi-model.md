# 多模型切换专题

## 问题背景

讯飞星辰API（astron-code-latest）频繁返回`EngineInternalError`（错误码10012），导致服务中断。

## 故障表现

- **错误码**: 10012 (EngineInternalError)
- **HTTP状态**: 403 Forbidden
- **频率**: 每小时准时故障
- **影响**: 消息处理中断，用户无响应

## 解决方案

### 1. 多模型配置

```javascript
const models = {
  primary: 'astroncodingplan/astron-code-latest',
  fallback: [
    'moonshot/kimi-k2.5',      // 256k上下文
    'qwen-portal/coder-model',  // 128k上下文
    'dseepseek/deepseek-chat'   // 16k上下文
  ]
};
```

### 2. 错误检测逻辑

```javascript
function detectAPIError(error) {
  if (error.code === 10012 || error.status === 403) {
    return 'MODEL_SWITCH_REQUIRED';
  }
  return 'RETRY';
}
```

### 3. 切换流程

1. 检测到API故障
2. 立即切换到备用模型
3. 缓存切换期间的消息
4. 切换完成后处理缓存消息

### 4. 消息队列实现

```javascript
class MessageQueue {
  constructor() {
    this.queue = [];
    this.maxSize = 100;
  }
  
  enqueue(message) {
    if (this.queue.length < this.maxSize) {
      this.queue.push(message);
    }
  }
  
  dequeue() {
    return this.queue.shift();
  }
  
  processAll() {
    while (this.queue.length > 0) {
      const message = this.dequeue();
      handleMessage(message);
    }
  }
}
```

### 5. 健康检查机制

```javascript
async function healthCheck() {
  const results = await Promise.all([
    pingModel('astroncodingplan/astron-code-latest'),
    pingModel('moonshot/kimi-k2.5'),
    pingModel('qwen-portal/coder-model')
  ]);
  
  return results;
}
```

## 效果评估

- **切换成功率**: 80%
- **平均缓存消息数**: 2-5条
- **切换耗时**: < 5秒

## 待改进

- [ ] 消息队列持久化（目前是内存队列）
- [ ] 更快的错误检测
- [ ] 自动恢复到主模型

## 贡献者

绛璃 - 2026-03-22
