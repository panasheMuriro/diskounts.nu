let links = require('./data/business_links')
links = Object.values(links)[0]

const fs = require('fs')

const getDiscounts = async () => {

    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    const navigationPromise = page.waitForNavigation()
    await page.setViewport({ width: 1920, height: 969 })

    // Initialize an array to store the scraped data
    let diskounts_data = []

    // loop through the links
    for (let linkIndex = 0; linkIndex < links.length; linkIndex++) {

        await page.goto(links[linkIndex].link); // visit the link
        await navigationPromise // Wait until the navigation is complete
        console.log(linkIndex, " of ", links.length, "- visited: ", links[linkIndex].link)

        // Extract address, description, phone, website, email, benefactors, discount from the page
        const data = await page.$$eval('.content, #partner-left, #partner-right', (elements) => {
            try {
                const [contentEl, partnerLeftEl, partnerRightEl] = elements;
                let description, address, phone, website, email, discount, benefactors;

                try {
                    description = contentEl.children[2].innerText;
                } catch (e) { }
                try {
                    address = Array.from(partnerLeftEl.children).filter(x => /Address/g.test(x.outerHTML))[0].innerText
                } catch (e) { }
                try {
                    phone = Array.from(partnerLeftEl.children).filter(x => /Phone/g.test(x.outerHTML))[0].innerText
                } catch (e) { }
                try {
                    website = Array.from(partnerLeftEl.children).filter(x => /Site/g.test(x.outerHTML))[0].children[1].href
                } catch (e) { }
                try {
                    email = Array.from(partnerLeftEl.children).filter(x => /Email/g.test(x.outerHTML))[0].innerText
                } catch (e) { }
                try {
                    discount = partnerRightEl.children[0].innerText;
                } catch (e) { }
                try {
                    benefactors = partnerRightEl.children[1].innerText;
                } catch (e) { }

                return { description, phone, website, email, discount, benefactors, address, };
            } catch (e) { }
        });
        // Add the scraped data to a file
        fs.appendFileSync('diskounts_data.js', JSON.stringify({ ...data, business: links[linkIndex].business  }) + ", ", () => {
        })
    }
    await browser.close() // close the browser session
    return diskounts_data
}


getDiscounts().then(data => {
    console.log("done scrapping")
})