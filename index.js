const axios = require('axios')
const cheerio = require('cheerio')

const fetchGames = async () => {
    try {
        const response = await axios.get('https://www.amazon.com/s?k=games&ref=nb_sb_noss')
        const html = response.data
        const $ = cheerio.load(html)
        const games = []

        $('div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20').each((index, el) => {
            const game = $(el)
            const title = game.find('h2.a-size-base-plus.a-spacing-none.a-color-base.a-text-normal').text()
            games.push(title)
        })
        return games
    } catch (err) {
        console.error(err)
    }
}

fetchGames().then(games => console.log(games))