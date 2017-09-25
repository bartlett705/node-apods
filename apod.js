"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qs = require("querystring");
const url_1 = require("url");
const node_fetch_1 = require("node-fetch");
const fs_1 = require("fs");
const pretty_print_1 = require("./pretty-print");
const APOD_BASE_URL = new url_1.URL('/planetary/apod', 'https://api.nasa.gov');
const buildApodUri = (baseURL) => {
    const apiParameters = {
        api_key: 'DEMO_KEY',
        hd: true,
    };
    baseURL.search = qs.stringify(apiParameters);
    return baseURL;
};
const dueEt = async () => {
    try {
        const response = await node_fetch_1.default(buildApodUri(APOD_BASE_URL).href);
        const json = await response.json();
        const fileResponse = await node_fetch_1.default(json.hdurl);
        const archivalDest = fs_1.createWriteStream(`/home/phylo/Pictures/apods/${json.date}-${json.title}.jpg`);
        const desktopDest = fs_1.createWriteStream(`/home/phylo/Desktop/current-apod.jpg`);
        pretty_print_1.prettyPrint(json.explanation);
        fileResponse.body.pipe(archivalDest);
        fileResponse.body.pipe(desktopDest);
    }
    catch (err) {
        console.error(err, ' YOU SUCK LUL ');
    }
};
dueEt();
