# anydoor
将本地目录变成一个静态文件服务器的根目录

## 安装

```shell
npm install -g anydoor
```

## 使用

```
anydoor  # 当前目录为根目录，在 http://127.0.0.1:9527 启动

anydoor -p 8080  # 设置端口号为 8080

anydoor -h test.com  # 设置 host 为 test.com

anydoor -d /projects  # 自定义根目录
```
