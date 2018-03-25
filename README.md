# iot

準備は基本的にこのサイトの通りで。。

https://qiita.com/masatomix/items/87d0d5f72668d9c76089

あとは

```
$ npm install
$ sudo node index.js
```

でOKかと。



## サービス化したいばあい。

### Systemd のファイルコピー

```
$ sudo cp -pfr  ./iot.service /etc/systemd/system/
```
あとは自動起動設定

```
$ sudo systemctl enable iot
Created symlink /etc/systemd/system/multi-user.target.wants/iot.service → /etc/systemd/system/iot.service.

$ sudo systemctl list-unit-files --type service | grep iot
iot.service                            enabled
```

サービスの起動は下記コマンドで。

```
$ sudo systemctl start  iot

```

最後にログの参照方法


```
$ sudo journalctl  -f -u iot
```
