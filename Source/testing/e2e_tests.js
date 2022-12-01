describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
    beforeAll(async () => {
        //await page.goto('https://cse110-f2021.github.io/Lab8_Website');
        await page.goto('http://localhost:8000/');
    });

    // Next, check to make sure that all 20 <product-item> elements have loaded
    it('Initial Home Page - Check for 20 product items', async () => {
        console.log('Checking for 20 product items...');
        // Query select all of the <product-item> elements and return the length of that array
        const numProducts = await page.$$eval('product-item', (prodItems) => {
            return prodItems.length;
        });
        // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
        expect(numProducts).toBe(20);
    });

    // Check to make sure that all 20 <product-item> elements have data in them
    it('Make sure <product-item> elements are populated', async () => {
        console.log('Checking to make sure <product-item> elements are populated...');
        // Start as true, if any don't have data, swap to false
        let allArePopulated = true;
        let data, plainValue;
        // Query select all of the <product-item> elements
        const prodItems = await page.$$('product-item');
        for (let item in prodItems) {
            // console.log(`Checking product item ${item}/${prodItems.length}`);
            // Grab the .data property of <product-items> to grab all of the json data stored inside
            data = await prodItems[item].getProperty('data');
            // Convert that property to JSON
            plainValue = await data.jsonValue();
            // Make sure the title, price, and image are populated in the JSON
            if (plainValue.title.length == 0) { allArePopulated = false; }
            if (plainValue.price.length == 0) { allArePopulated = false; }
            if (plainValue.image.length == 0) { allArePopulated = false; }
            // Expect allArePopulated to still be true
            expect(allArePopulated).toBe(true);
        }
        // DONE - Step 1
        // Right now this function is only checking the first <product-item> it found, make it so that
        // it checks every <product-item> it found
    }, 10000);
});