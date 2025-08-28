import {test, expect} from "@playwright/test";
import TEST_DATA from "./add-pet.json";
import {fillFormTextFields} from "../helpers";

const addNewPet = async (page) => {
    const FORMFIELDS = [...TEST_DATA.data.formfields];
     //add element to formfields
    FORMFIELDS.push({label: TEST_DATA.elements.label_pet_date_of_birth, value: TEST_DATA.data.birthDate_valid})
    await fillFormTextFields(page, FORMFIELDS);

    await page.getByLabel(TEST_DATA.elements.label_pet_type).selectOption(TEST_DATA.data.pet_type);

    await expect(page.getByLabel(TEST_DATA.elements.label_pet_type)).toHaveValue(TEST_DATA.data.pet_type);

    await page
        .getByRole('button')
        .click()

} 

test('find add new pet button', async ({ page }) => {
    await page.goto(TEST_DATA.data.page_url_owner);

    await page
    .getByRole('link', {name: TEST_DATA.elements.owner_page_button_add})
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

test('Form Validation: test date in future', async ({ page }) => {
    await page.goto(TEST_DATA.page_url);

    const FORMFIELDS = [...TEST_DATA.data.formfields];
     //add element to formfields
    FORMFIELDS.push({label: TEST_DATA.elements.label_pet_date_of_birth, value: TEST_DATA.data.birthDate_invalid})

    await fillFormTextFields(page, FORMFIELDS);

    await page
        .getByRole('button')
        .click()

    await expect(page.getByText(TEST_DATA.elements.error_date_future)).toHaveCount(1);
});

test('add new pet', async ({ page }) => {
    await page.goto(TEST_DATA.page_url);

    await addNewPet(page);
    
    await expect(page.getByText(TEST_DATA.elements.text_add_pet_success)).toBeVisible();

});

test('adding multiple pets with same name not allowed', async ({ page }) => {
    await page.goto(TEST_DATA.page_url);

    await addNewPet(page);

    await expect(page.getByText(TEST_DATA.elements.text_add_pet_error)).toBeVisible();

});


//TODO: Write Datepicker Tests!
//test('Form Validation: test Datepicker', async ({ page }) => {
//});

