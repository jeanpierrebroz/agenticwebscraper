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
const scraper_1 = require("./scraper/scraper");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const scraper = yield scraper_1.Scraper.setup();
        const searchTerm = "Playwright web scraping";
        const resultsToCheck = 5;
        try {
            const links = yield scraper.search(searchTerm, resultsToCheck);
            console.log(`Top ${resultsToCheck} links for "${searchTerm}":`);
            links.forEach((link, index) => {
                console.log(`${index + 1}: ${link}`);
            });
        }
        catch (error) {
            console.error("An error occurred during scraping:", error);
        }
        finally {
            yield scraper.close();
        }
    });
}
main();
