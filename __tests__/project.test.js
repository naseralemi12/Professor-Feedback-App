describe('Basic user flow for Website', () => {
      beforeAll(async () => {
          await page.goto('http://localhost:8000/assets/html/landing_page.html');
      });

      // Test Landing Page
      it('Check landing page', async () => {
        await page.click('.button');
        const title = await page.title();
        expect(title).toBe('login');
      });
  
      // Test Login features
      it('Check cancel button', async () => {
        const button = await page.$('#cancelButton');
        await button.click();
        await page.waitForNavigation()
        const url = await page.url();
        expect(url).toBe('http://localhost:8000/assets/html/landing_page.html');
        // Go back to desired page
        await page.goto('http://localhost:8000/assets/html/login.html');
      });
      
      it('Check login fields when empty', async () => {
        // Click login button with empty fields
        const button = await page.$('#logInButton');
        await button.click();
        const warning = await page.$('#warningMessage');
        const message = await warning.evaluate(el => el.textContent);
        expect(message).toBe('All fields are required. Please try again.');
      });

      it('Check wrong login', async () => {
        await page.$eval('#emailInput', el => el.value = 'test@example.com');
        await page.$eval('#passwordInput', el => el.value = 'bad password');
        await page.evaluate(() => {
            let radio = document.querySelector('#student');
            radio.click();
        });
        const button = await page.$('#logInButton');
        await button.click();
        const warning = await page.$('#warningMessage');
        const message = await warning.evaluate(el => el.textContent);
        expect(message).toBe('Wrong Email or Password. Please try again.');
      });

      it('Check invalid login', async () => {
        await page.$eval('#emailInput', el => el.value = 'not a valid email');
        await page.$eval('#passwordInput', el => el.value = 'invalid');
        await page.evaluate(() => {
            let radio = document.querySelector('#student');
            radio.click();
        });
        const button = await page.$('#logInButton');
        await button.click();
        const warning = await page.$('#warningMessage');
        const message = await warning.evaluate(el => el.textContent);
        expect(message).toBe('Invalid Email. Please Enter a valid email.');
      });

      it('Check valid login', async () => {
        await page.$eval('#emailInput', el => el.value = 'cse110@ucsd.edu');
        await page.$eval('#passwordInput', el => el.value = 'group31');
        await page.evaluate(() => {
            let radio = document.querySelector('#student');
            radio.click();
        });
        const button = await page.$('#logInButton');
        await button.click();
        await button.click();
        await page.waitForNavigation();
        const title = await page.title();
        expect(title).toBe("Student's Feedback");
        // Go back to desired page
        await page.goto('http://localhost:8000/assets/html/login.html');
      });

      it('Check valid professor login', async () => {
        await page.$eval('#emailInput', el => el.value = 'abc@ucsd.edu');
        await page.$eval('#passwordInput', el => el.value = 'abc12');
        await page.evaluate(() => {
            let radio = document.querySelector('#professor');
            radio.click();
        });
        const button = await page.$('#logInButton');
        await button.click();
        await button.click();
        await page.waitForNavigation();
        const title = await page.title();
        expect(title).toBe("Professor's Feedback");
      });

      // Check professors feedback
      it('Professor feedback add class', async () => {
        await page.$eval('#newClass', el => el.value = 'cse110');
        let options = await page.$$('option');
        expect(options.length).toBe(1);
        const button = await page.$('#addNewClassBtn');
        await button.click();
        await page.waitForNavigation();
        options = await page.$$('option');
        expect(options.length).toBe(2);
      });
  });