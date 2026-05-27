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

## 循环删除子包，重新安装

```bash
pnpm recursive exec rm -rf node_modules
rm -rf node_modules
rm -rf packages/*/node_modules
rm -rf packages/@n8n/*/node_modules
pnpm store prune
# 如果不行，换 --no-frozen-lockfile
pnpm install --frozen-lockfile
or
pnpm install --no-frozen-lockfile
pnpm build
```

## 压缩包

### 生成 tar.gz

```bash
# build
build:deploy

# 创建 tar.gz 压缩包，自动将软链接替换为实际文件，-C 切换目录，后面是文件名
tar --dereference -czf n8n-compiled.tar.gz -C /Users/gsx/www/gofile/src/common/n8n compiled

# 移动到 umaAI
mv n8n-compiled.tar.gz ~/www/bilibili/my/uma-ai/build/extraResources
cd ~/www/bilibili/my/uma-ai/build/extraResources
tar -xzf n8n-compiled.tar.gz

# 打的压缩包可能有问题，先按下面处理
# 找个目录去解压 tar.gz
# 修改 semver 的代码
#修改 /Users/gsx/www/bilibili/my/uma-ai/build/extraResources/compiled/node_modules/semver/classes/range.js ：

// 第 201 行
const LRU = require('lru-cache')
const cache = new LRU({ max: 1000 })

// 改为
const { LRUCache } = require('lru-cache')
const cache = new LRUCache({ max: 1000 })

# 替换 env

# 替换 中文 ui
# 把 editor-ui.tar.gz 解压到 dist目录下替换
/Users/gsx/www/bilibili/my/uma-ai/build/extraResources/compiled/node_modules/n8n-editor-ui/dist

# 然后重新生产 tar.gz；-C 切换目录，后面是文件名
tar -czf compiled.tar.gz -C /Users/gsx/www/bilibili/my/uma-ai/build/extraResources compiled

```

### 生成 zip

```bash
# 或者创建 zip 压缩包（需要先复制一份）
cp -rL /Users/gsx/www/gofile/src/common/n8n/compiled /tmp/compiled
cd /tmp
zip -r n8n-compiled.zip compiled
rm -rf /tmp/compiled

# 或者先复制再压缩
# 复制整个目录，将软链接替换为实际文件
cp -rL /Users/gsx/www/gofile/src/common/n8n/compiled /tmp/compiled

# 创建 tar.gz
cd /tmp
tar -czf n8n-compiled.tar.gz compiled

# 或者创建 zip
zip -r n8n-compiled.zip compiled

# 清理临时文件
rm -rf /tmp/compiled
```

### 其他方式生成压缩包

pnpm build:deploy 也不行，生成的 semver包里面还是有问题的代码


## 中文替换

1. 找到路径：C:\Users\xxxxxx\AppData\Local\npm-cache_npx\n8n\node_modules\n8n-editor-ui\dist （新版本也可能是C:\Users\xxxxxx\AppData\Roaming\npm\node_modules\n8n\node_modules\n8n-editor-ui\dist）
2. 下载对应版本editor-ui.tar.gz文件
3. 解压到 dist目录下替换
4. 设置环境变量 N8N_DEFAULT_LOCALE=zh-CN，自行咨询AI设置方法
5. 重启 n8n 服务

```bash


```
