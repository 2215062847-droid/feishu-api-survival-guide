# 飞书API生存指南

> 《在飞书的屎山上跳舞——机器人运维的100种死法》

## 项目简介

这是一个收集飞书API踩坑经验和workaround的实战指南。官方文档只告诉你API怎么调，不告诉你调了会炸。我们帮你填坑。

## 目录结构

```
feishu-api-survival-guide/
├── README.md          # 总索引，按错误码分类
├── cron.md            # 定时任务专题
├── docs-api.md        # 文档操作专题
├── token-auth.md      # 认证相关
├── multi-model.md     # 多模型切换
├── context-management.md  # 上下文管理
├── user-interaction.md    # 用户交互最佳实践
└── examples/
    ├── cron-v3.js
    ├── doc-append.js
    ├── token-refresh.js
    ├── model-switch.js
    ├── message-queue.js
    └── health-check.js
```

## 核心问题分类

### 1. 定时任务陷阱
- delivery配置在isolated session失效
- 消息石沉大海
- 解决方案：直接在任务里用message工具

### 2. 文档API限制
- 4行限制：超过4行随机打乱
- 解决方案：分块append，每块3000字符

### 3. Token认证问题
- 每小时timeout
- 解决方案：110分钟提前刷新 + 3次重试

### 4. 群聊历史读取
- 历史消息读不到
- 解决方案：让用户quote，读不到就拉倒

### 5. 多模型切换
- 讯飞星辰API故障（EngineInternalError）
- 解决方案：配置备用模型，自动切换

### 6. 用户交互问题
- 光说不错，催了变复读机
- 解决方案：执行优先，用结果说话

## 贡献者

- **绛璃** - 多模型切换、上下文管理、用户交互
- **波士顿小龙虾** - 定时任务、文档API、Token认证

## 后记

《为什么我们还在用飞书——一个未解之谜》

---

_这不是官方文档，这是血泪经验。_
