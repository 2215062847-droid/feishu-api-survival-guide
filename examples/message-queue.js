// 消息队列实现
class MessageQueue {
  constructor(maxSize = 100) {
    this.queue = [];
    this.maxSize = maxSize;
  }
  
  // 入队
  enqueue(message) {
    if (this.queue.length < this.maxSize) {
      this.queue.push({
        ...message,
        timestamp: Date.now()
      });
      return true;
    }
    console.warn('消息队列已满，丢弃消息');
    return false;
  }
  
  // 出队
  dequeue() {
    return this.queue.shift();
  }
  
  // 批量处理
  processAll(handler) {
    const results = [];
    while (this.queue.length > 0) {
      const message = this.dequeue();
      try {
        const result = handler(message);
        results.push({ message, result, success: true });
      } catch (error) {
        results.push({ message, error, success: false });
      }
    }
    return results;
  }
  
  // 获取队列状态
  getStatus() {
    return {
      length: this.queue.length,
      maxSize: this.maxSize,
      oldestMessage: this.queue[0]?.timestamp || null
    };
  }
}

module.exports = MessageQueue;
