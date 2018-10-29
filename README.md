# cloud archiver

[Cloud archiver](https://github.com/cloud-archiver/core) helps you to backup data from different cloud services. This plugin is intend to save rss and atom feeds..

## setup

Install the plugin into your cloud archiver configuration directory.

```shell
$ npm install --save @cloud-archiver/feeds
```

Edit your configuration to load the plugin.

```javascript
plugins: [
// ...
  require('@cloud-archiver/feeds')
// ...
]
```

To backup a feed run

```shell
$ node_modules/.bin/cloud-archiver feed:url https://www.reddit.com/r/AskReddit/new.rss
```
By default the `title` attribute of the feed will be used as folder name in your storage directory. To overwrite this name use the `-t` flag.

## license

MIT

