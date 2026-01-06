# 快速开始

## 安装

```bash
# node
nvm install 22.21.1
nvm use 22.21.1
nvm alias default 22.21.1

# 安装 pnpm
corepack prepare --activate
# or
npm install -g pnpm

# 初始化
pnpm setup
source /Users/gsx/.zshrc

# 安装依赖
pnpm install
```

## 运行

## 启动服务

```bash
# 构建和启动
pnpm build
pnpm start

# 后台运行
nohup ./packages/cli/bin/n8n > /Users/gsx/www/logs/n8n/n8n.log 2>&1 &
```

## 数据存储

在目录 `~/.n8n/`

```bash
ll ~/.n8n/
```

## 自定义环境变量

在目录 `~/.n8n/` 下创建文件 `env`，添加自定义环境变量。

```bash
# 端口
# N8N_PORT=15678
# 安全 cookie，默认 true。如果使用frp等反向代理，需要设置为 false。
N8N_SECURE_COOKIE=false
```

