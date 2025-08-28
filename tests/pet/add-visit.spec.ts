import {test, expect} from "@playwright/test";
import TEST_DATA from "./add-visit.json";
import {fillFormTextFields} from "../helpers";


const addVisit = async (page, FORMFIELDS) => {
     //add element to formfields
    await fillFormTextFields(page, FORMFIELDS);

    await page
        .getByRole('button')
        .click()

} 

test('find add new visit button', async ({ page }) => {
    await page.goto(TEST_DATA.data.page_url_owner);

    await page
        .getByRole('link', {name: TEST_DATA.elements.owner_page_button_add})
        .first()
        .click();

    await page.waitForURL(TEST_DATA.page_url);
    await page.waitForTimeout(200);

    await expect(page.url()).toContain(TEST_DATA.page_url);      
    await expect(page.getByRole('heading')).toHaveText(TEST_DATA.elements.heading);      
});

test('Form Validation: leave all fields empty', async ({ page }) => {
    await page.goto(TEST_DATA.page_url);

    await page
        .getByRole('button')
        .click()

    await expect(page.getByText(TEST_DATA.elements.error_input_blank)).toHaveCount(TEST_DATA.elements.error_input_blank_count);
});

test('Add visit', async ({ page }) => {
    await page.goto(TEST_DATA.page_url);

    const FORMFIELDS = TEST_DATA.data.visits.shift()?.formfields;
    await addVisit(page, FORMFIELDS);

    await expect(page.getByText(TEST_DATA.elements.text_add_visit_success)).toBeVisible();
});

test('Add more visits', async ({ page }) => {

    const VISITS = TEST_DATA.data.visits;

    for(let i = 0; i < VISITS.length; i++) {
        await page.goto(TEST_DATA.page_url);
        await addVisit(page, VISITS[i].formfields);
        await expect(page.getByText(TEST_DATA.elements.text_add_visit_success)).toBeVisible();
    }

});