const Parser = require('rss-parser')
const mkdirp = require('mkdirp')
const fs = require('fs')

module.exports = class Feeds {
  static name() {
    return 'feeds'
  }

  constructor ({ config, cache, logger, program }) {
    this.config = config
    this.cache = cache
    this.logger = logger
    this.program = program

    this.parser = new Parser()

    this.program
      .command('feed:url')
      .arguments('<url>')
      .option('-t, --title [title]', 'Name to use for directory name')
      .action(this.feed.bind(this))
  }

  async feed (url, command) {
    const feed = await this.parser.parseURL(url)
    const name = command.title || feed.title

    const basePath = `${this.config.storage}/feeds/${name}`
    mkdirp.sync(basePath)

    await Promise.all(feed.items.map(async item => {
      this.logger.log('Saving', item.title)

      const title = `${item.pubDate} ${item.title}.json`.replace(/\//g, '').replace(/\ /g, '_')
      const path = [basePath, title].join('/')

      await fs.writeFileSync(path, JSON.stringify(item))
    }))
  }
}

