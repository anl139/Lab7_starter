describe('Basic user flow for Website', () => {
  // First, visit the lab 7 website
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
  });

  // Each it() call is a separate test
  // Here, we check to make sure that all 20 <product-item> elements have loaded
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
  // We use .skip() here because this test has a TODO that has not been completed yet.
  // Make sure to remove the .skip after you finish the TODO. 
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');

    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;

    // Query select all of the <product-item> elements
    const prodItemsData = await page.$$eval('product-item', prodItems => {
      return prodItems.map(item => {
        // Grab all of the json data stored inside
        return data = item.data;
      });
    });

    console.log(`Checking product item 1/${prodItemsData.length}`);

      for (let i = 0; i < prodItemsData.length; i++) {
    const { title, price, image } = prodItemsData[i];
    console.log(`Checking product item ${i + 1}/${prodItemsData.length}`);

    if (title.length === 0) {
      console.error(`Item ${i + 1} has empty title`);
      allArePopulated = false;
    }
    if (price.length === 0) {
      console.error(`Item ${i + 1} has empty price`);
      allArePopulated = false;
    }
    if (image.length === 0) {
      console.error(`Item ${i + 1} has empty image`);
      allArePopulated = false;
    }
  }

  // Expect allArePopulated to still be true
  expect(allArePopulated).toBe(true);
}, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    const firstItem = await page.$('product-item');
    const shadow = await firstItem.getProperty('shadowRoot');
    const btn = await shadow.$('button');

    await btn.click();
    const text = await (await btn.getProperty('innerText')).jsonValue();
    expect(text).toBe('Remove from Cart');
    await btn.click();
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
  console.log('Checking number of items in cart on screen...');

  // Query select all of the <product-item> elements
  const productItems = await page.$$('product-item');

  // Click "Add to Cart" on each one
  for (let i = 0; i < productItems.length; i++) {
    // Grab the shadowRoot of the product-item
    const shadowRoot = await productItems[i].getProperty('shadowRoot');

    // Query the button inside the shadowRoot and click it
    const button = await shadowRoot.$('button');
    await button.click();

    console.log(`Clicked Add to Cart on item ${i + 1}/${productItems.length}`);
  }

  // After all clicks, check the cart count
  const cartCount = await page.$eval('#cart-count', el => el.innerText);
  console.log(`Cart count is now: ${cartCount}`);

  // Expect the cart count to be "20"
  expect(cartCount).toBe('20');
}, 35000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
 // Check to make sure that after you reload the page it remembers all of the items in your cart
it('Checking number of items in cart on screen after reload', async () => {
  console.log('Checking number of items in cart on screen after reload...');

  // Reload the page
  await page.reload();
  
  // Wait for the products to be present again
  await page.waitForSelector('product-item');

  // Query select all of the <product-item> elements
  const productItems = await page.$$('product-item');

  // Verify each product-item’s button says "Remove from Cart"
  for (let i = 0; i < productItems.length; i++) {
    const shadowRoot = await productItems[i].getProperty('shadowRoot');
    const button = await shadowRoot.$('button');
    const buttonText = await (await button.getProperty('innerText')).jsonValue();
    
    console.log(`Item ${i + 1}/${productItems.length} button text: ${buttonText}`);
    expect(buttonText).toBe('Remove from Cart');
  }

  // Also check that the cart count is still "20"
  const cartCount = await page.$eval('#cart-count', el => el.innerText);
  console.log(`Cart count after reload: ${cartCount}`);
  expect(cartCount).toBe('20');
}, 50000);


 it('Checking the localStorage to make sure cart is correct', async () => {
  // Retrieve the 'cart' entry from localStorage
  const cartValue = await page.evaluate(() => {
    return window.localStorage.getItem('cart');
  });

  // The expected stringified array of product IDs 1 through 20
  const expected = JSON.stringify(
    Array.from({ length: 20 }, (_, i) => i + 1)
  );

  console.log(`localStorage cart value: ${cartValue}`);
  console.log(`Expected cart value: ${expected}`);

  // Assert that the value stored matches exactly what we expect
  expect(cartValue).toBe(expected);
});

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
 it('Checking number of items in cart on screen after removing from cart', async () => {
  console.log('Checking number of items in cart on screen after removing from cart...');

  // Query select all of the <product-item> elements
  const productItems = await page.$$('product-item');

  // Click "Remove from Cart" on each one
  for (let i = 0; i < productItems.length; i++) {
    const shadowRoot = await productItems[i].getProperty('shadowRoot');
    const button = await shadowRoot.$('button');
    await button.click();
    console.log(`Clicked Remove from Cart on item ${i + 1}/${productItems.length}`);
  }

  // After all removals, check the cart count
  const cartCount = await page.$eval('#cart-count', el => el.innerText);
  console.log(`Cart count is now: ${cartCount}`);

  // Expect the cart count to be "0"
  expect(cartCount).toBe('0');
}, 35000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    // Reload the page
    await page.reload();
    await page.waitForSelector('product-item');

    // Query select all of the <product-item> elements
    const productItems = await page.$$('product-item');

    // Verify each product-item’s button says "Add to Cart"
    for (let i = 0; i < productItems.length; i++) {
      const shadowRoot = await productItems[i].getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const buttonText = await (await button.getProperty('innerText')).jsonValue();

      console.log(`Item ${i + 1}/${productItems.length} button text after reload: ${buttonText}`);
      expect(buttonText).toBe('Add to Cart');
    }

    // Also check that the cart count is still "0"
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    console.log(`Cart count after reload: ${cartCount}`);
    expect(cartCount).toBe('0');
  }, 35000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');

    // Retrieve the 'cart' entry from localStorage
    const cartValue = await page.evaluate(() => {
      return window.localStorage.getItem('cart');
    });

    // The expected empty array
    const expected = JSON.stringify([]);

    console.log(`localStorage cart value: ${cartValue}`);
    console.log(`Expected cart value: ${expected}`);

    // Assert that the value stored matches exactly what we expect
    expect(cartValue).toBe(expected);
  });
});
