import {test, expect} from "@playwright/test";
import TEST_DATA from "./find-owner.json";


test.beforeEach(async ({ page }) => {
  await page.goto(TEST_DATA.page_url);
});

test('find no owner', async ({ page }) => {
    await page
          .getByRole('textbox')
          .fill(TEST_DATA.data.owner_none);
    
    await page
          .getByRole('button', {name: TEST_DATA.elements.button_find})
          .click();

    await expect(page.getByText(TEST_DATA.elements.text_owner_none)).toBeVisible();      
});


test('find specific owner', async ({ page }) => {
    await page
          .getByRole('textbox')
          .fill(TEST_DATA.data.owner_specific);
   
    await page
          .getByRole('button', {name: TEST_DATA.elements.button_find})
          .click();

    await expect(page.getByRole('heading').first()).toHaveText(TEST_DATA.elements.heading_owner_specific);      
});

test('find multiple owners', async ({ page }) => {
    await page
          .getByRole('textbox')
          .fill(TEST_DATA.data.owner_multiple);

    await page
          .getByRole('button', {name: TEST_DATA.elements.button_find})
          .click();

    //check the first heading, as there can be multiple on the page
    await expect(page.getByRole('heading').first()).toHaveText(TEST_DATA.elements.heading_owner_multiple);      
    
    //count table rows
    await expect(page.locator('#owners > tbody tr')).toHaveCount(TEST_DATA.elements.table_rows_owner_multiple_count);
});