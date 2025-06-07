"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scraper = void 0;
const playwright_1 = require("playwright");
class Scraper {
    constructor(browser, context, page) {
        this.browser = browser;
        this.context = context;
        this.page = page;
    }
    static setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield playwright_1.chromium.launch();
            const context = yield browser.newContext(playwright_1.devices['iPhone 14 Pro']);
            const page = yield context.newPage();
            return new Scraper(browser, context, page);
        });
    }
    //Called for each keyword phrase. Returns the content of each web page explored.
    search(searchTerm, resultsToCheck) {
        return __awaiter(this, void 0, void 0, function* () {
            var searchResultPage = yield this.getSearchResults(searchTerm);
            if (searchResultPage == null) {
                return [];
            }
            var links = yield this.getTopLinks(searchResultPage, resultsToCheck);
            return links;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.browser.close();
            yield this.page.close();
            yield this.browser.close();
        });
    }
    getSearchResults(searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "https://www.bing.com/search?q=" + encodeURIComponent(searchTerm);
            const response = yield this.page.goto(url);
            if (!response || !response.ok()) {
                return null;
            }
            return this.page;
        });
    }
    //Extracts the top k links from the search results page.
    getTopLinks(searchPageResults, k) {
        return __awaiter(this, void 0, void 0, function* () {
            const links = yield searchPageResults.$$eval('li.b_algo a[href]', (anchors, max) => anchors.slice(0, max).map(a => a.href), k);
            return links;
        });
    }
}
exports.Scraper = Scraper;
