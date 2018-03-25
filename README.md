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


### 自動起動

```
$ sudo systemctl enable iot
Created symlink /etc/systemd/system/multi-user.target.wants/iot.service → /etc/systemd/system/iot.service.

$ sudo systemctl list-unit-files --type service | grep iot
iot.service                            enabled
```

### サービス起動


```
$ sudo systemctl start  iot

```

### ログ参照


```
$ sudo journalctl  -f -u iot
```
