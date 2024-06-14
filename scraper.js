import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs/promises';

async function fetchDNSTransports(URL) {
    try {
        const response = await axios.get(URL);
        const $ = cheerio.load(response.data);

        const transports = [];

        $('.catalog-product').each((index, element) => {
            const title = $(element).find('.catalog-product__name').text().trim();
            const link = $(element).find('.catalog-product__name a').attr('href');
            const price = $(element).find('.product-buy__price').text().trim();
            const image = $(element).find('.catalog-product__image-link').attr('href');
            const description = $(element).find(' span').text().trim();
            
            transports.push({
                title,
                link: `https://www.dns-shop.kz${link}`,
                price,
                image,
                description
            });
        });

        return transports;
    } catch (error) {
        console.error('Error fetching DNS articles:', error);
        return [];
    }
}

export default fetchDNSTransports;

// Example usage
fetchDNSTransports('https://www.dns-shop.kz/catalog/actual/13963825-4034-4ce1-94d0-41fc78eb6d15/?stock=now-today-tomorrow-later&category=17a892f816404e77')
    .then(transports => {
        console.log(transports);
    })
    .catch(error => {
        console.error('Error:', error);
    });
