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
# install 报错，重新安装xcode，继续 pnpm install
sudo rm -rf /Library/Developer/CommandLineTools
xcode-select --install
```

## 运行

## 启动服务

```bash
# 构建和启动
pnpm build
pnpm start

# 后台运行
# nohup ./packages/cli/bin/n8n > /Users/gsx/www/logs/n8n/n8n.log 2>&1 &
nohup ./packages/cli/bin/n8n > /dev/null 2>&1 &
nohub /Users/gsx/www/gofile/src/common/n8n/packages/cli/bin/n8n > /dev/null 2>&1 &
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

## 安装依赖包

方式一，安装到根目录并改N8N_RUNNERS_ENABLED为非沙箱模式

影响性能，且官方不推荐

```
pnpm add crawlee -w
```

方式二，安装到代码节点相关的库, 也要使用非沙箱模式

有没有办法在沙箱模式下运行？

```
# 编辑 packages/@n8n/task-runner/package.json
"crawlee": "catalog:",

# 编辑 pnpm-workspaces.yalm
catalog:
    crawlee: 3.16.0

# 安装和构建
pnpm install
pnpm build
```

## 循环删除子包

```bash
pnpm recursive exec rm -rf node_modules
rm -rf node_modules
pnpm build    
```

