
Amazon Dash Button を IoT ボタンとして使用するためのアプリ。
ボタン押下時に、任意のサイトへリクエストを送信することが出来ます。


## 環境設定
環境構築は、基本的にこのサイトの通りで。
https://qiita.com/masatomix/items/87d0d5f72668d9c76089


configurationは、以下:

```bash
$ git clone https://github.com/masatomix/iot.git
$ cd iot
$ cat config/local.json
{
  "iot": {
    "buttons": {
      "001": {
        "mac_address": "xx:xx:xx:xx:xx:xx",
        "method": "POST",
        "url": "https://hooks.slack.com/services/xxxxxxxxx/xxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxx",
        "headers": {"Content-Type": "application/json"},
        "json": {
          "text": "001ボタンを押しました。",
          "channel": "#general"
        }
      },
      "002": {
        "mac_address": "yy:yy:yy:yy:yy:yy",
        "method": "POST",
        "url": "https://hooks.slack.com/services/yyyyyyyyx/yyyyyyyyx/yyyyyyyyyyyyyyyyyyyyyyyy",
        "headers": {"Content-Type": "application/json"},
        "json": {
          "text": "002ボタンを押しました。",
          "channel": "#general"
        }
      }
    }
  }
}
```

こんな感じに設定を書くことで、ボタンを押下したときに任意のURLへリクエストを送信することが出来ます。(サンプルとしてdefault.jsonを置いてあります.またmac_address以下の部分は、requestライブラリに渡すoptionと同等)

あとは

```bash
$ npm install
$ sudo node index.js
```

でプロセスが起動します。


## サービス化したいばあい。

### Systemd のファイルコピー

```bash
$ sudo cp -pfr  ./iot.service /etc/systemd/system/
```
あとは自動起動設定

```bash
$ sudo systemctl enable iot
Created symlink /etc/systemd/system/multi-user.target.wants/iot.service → /etc/systemd/system/iot.service.

$ sudo systemctl list-unit-files --type service | grep iot
iot.service                            enabled
```

サービスの起動は下記コマンドで。

```bash
$ sudo systemctl start  iot

```

最後にログの参照方法


```bash
$ sudo journalctl  -f -u iot
```



## Dockerで動かしたい場合

```bash
$ git clone https://github.com/masatomix/iot.git
$ cd iot
$ cat config/local.json を作るのは同じ
$ sudo docker-compose build
$ sudo docker-compose up  -d
```

## 改訂履歴

- 1.0.0 新規
- 1.0.3 Docker関連追加
- 1.0.4 リファクタリングして、Slack以外のサイトにもrequestを送られるようにした


