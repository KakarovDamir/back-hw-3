import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs/promises';

async function fetchOLXTransports(URL) {
    try {
        const data = await fs.readFile(URL, 'utf-8');
        const $ = cheerio.load(data);

        const transports = [];

        $('.offer-wrapper').each((index, element) => {
            const title = $(element).find('.lheight22.margintop5 > a').text().trim();
            const link = $(element).find('.lheight22.margintop5 > a').attr('href');
            const price = $(element).find('.price > strong').text().trim();
            const location = $(element).find('.bottom-cell > .breadcrumb > span').text().trim();
            const publicationTime = $(element).find('.bottom-cell > .breadcrumb > span.fleft').next().text().trim();
            const image = $(element).find('.img img').attr('src');
            const description = $(element).find('.space.inlblk.rel').text().trim();
            
            transports.push({
                title,
                link,
                price,
                location,
                publicationTime,
                image,
                description
            });
        });

        return transports;
    } catch (error) {
        console.error('Error fetching OLX articles:', error);
        return [];
    }
}

export default fetchOLXTransports;