# iot






サービス化するには
-----------------
### Systemd のファイルコピー
$ sudo cp -pfr  ~/iot.service /etc/systemd/system/


### 自動起動

```
$ sudo systemctl enable iot
Created symlink /etc/systemd/system/multi-user.target.wants/iot.service → /etc/systemd/system/iot.service.

$ sudo systemctl list-unit-files --type service | grep iot
iot.service                            enabled
```

### サービス起動
$ sudo systemctl start  iot


### ログ参照
$ sudo journalctl  -f -u iot
