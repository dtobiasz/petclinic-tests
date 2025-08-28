import {test, expect} from "@playwright/test";
import TEST_DATA from "./add-owner.json";
import {fillFormTextFields} from "../helpers";

test('find and click add button', async ({ page }) => {
    //manually set, because we test the "add owner" button here
    await page.goto('./owners/find');

    await page
        .getByRole('link', {name: TEST_DATA.elements.button_add})
        .click();

    await page.waitForURL(TEST_DATA.page_url);
    await expect(page.url()).toContain(TEST_DATA.page_url);      
});

test('Form Validation: leave all fields empty', async ({page}) => {
    await page.goto(TEST_DATA.page_url);

    await page
        .getByRole('button', {name: TEST_DATA.elements.button_add})
        .click();

    await expect(page.getByText(TEST_DATA.elements.error_input_blank)).toHaveCount(TEST_DATA.elements.error_input_blank_count);
    await expect(page.getByText(TEST_DATA.elements.error_input_phone)).toBeVisible();

});

test('Form Validation - phone number too short', async ({page}) => {
    await page.goto(TEST_DATA.page_url);

    const FORMFIELDS = [...TEST_DATA.data.formfields];
    FORMFIELDS.push({label: TEST_DATA.elements.label_telephone, value: TEST_DATA.data.owner_telephone_invalid_short})
    await fillFormTextFields(page, FORMFIELDS);
    
    await page
        .getByRole('button', {name: TEST_DATA.elements.button_add})
        .click();
    await expect(page.getByText(TEST_DATA.elements.error_input_phone)).toBeVisible();
});

test('Form Validation - phone number is not a number', async ({page}) => {
    await page.goto(TEST_DATA.page_url);

    const FORMFIELDS = [...TEST_DATA.data.formfields];
    FORMFIELDS.push({label: TEST_DATA.elements.label_telephone, value: TEST_DATA.data.owner_telephone_invalid_text});
    await fillFormTextFields(page, FORMFIELDS);
    
    //phone number is not a number
    await page
        .getByRole('button', {name: TEST_DATA.elements.button_add})
        .click();
    await expect(page.getByText(TEST_DATA.elements.error_input_phone)).toBeVisible();
});


test('create new owner', async ({page}) => {
    await page.goto(TEST_DATA.page_url);

    const FORMFIELDS = [...TEST_DATA.data.formfields];
    FORMFIELDS.push({label: TEST_DATA.elements.label_telephone, value: TEST_DATA.data.owner_telephone_valid})

    //fill in all fields except telephone
    await fillFormTextFields(page, FORMFIELDS);

    await page
        .getByRole('button', {name: TEST_DATA.elements.button_add})
        .click();

    await page.waitForURL(TEST_DATA.elements.page_redirect_url+'*');

    await expect(page.url()).toContain(TEST_DATA.elements.page_redirect_url);      
    await expect(page.getByText(TEST_DATA.elements.text_new_owner_created)).toBeVisible();      
});
