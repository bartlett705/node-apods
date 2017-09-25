import * as qs from 'querystring'
import { URL } from 'url'
import fetch from 'node-fetch'
import { createWriteStream } from 'fs'
import { prettyPrint } from './pretty-print';

const APOD_BASE_URL = new URL('/planetary/apod', 'https://api.nasa.gov')

const buildApodUri = (baseURL: URL) => {
    const apiParameters = {
        api_key: 'DEMO_KEY',
        hd: true,
    }

    baseURL.search = qs.stringify(apiParameters)

    return baseURL
}

const dueEt = async () => {
    try {
        const response = await fetch(buildApodUri(APOD_BASE_URL).href)
        const json = await response.json()
        const fileResponse = await fetch(json.hdurl)
        const archivalDest = createWriteStream(`/home/phylo/Pictures/apods/${json.date}-${json.title}.jpg`)
        const desktopDest = createWriteStream(`/home/phylo/Desktop/current-apod.jpg`)
        prettyPrint(json.explanation)
        fileResponse.body.pipe(archivalDest)
        fileResponse.body.pipe(desktopDest)        
    }

    catch(err) {
        console.error(err, ' YOU SUCK LUL ')
    }
}

dueEt()