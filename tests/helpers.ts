import { FormfieldType } from "./types";

export const fillFormTextFields = async (page, formfields: Array<FormfieldType>) => {
    for(let i = 0; i < formfields.length; i++) {
        await page.getByLabel(formfields[i].label).fill(formfields[i].value);
    }
}