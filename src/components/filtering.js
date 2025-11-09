import { createComparison, defaultRules } from "../lib/compare.js";

export function initFiltering(elements, indexes) {

    Object.keys(indexes)
        .forEach((elementName) => {
            if (elements[elementName]) {
                elements[elementName].append(
                    ...Object.values(indexes[elementName])
                        .map(name => {
                            const option = document.createElement('option');
                            option.value = name;
                            option.textContent = name;
                            return option;
                        })
                );
            }
        });

    return (data, state, action) => {
        if (action && action.name === 'clear') {
            const parentElement = action.parentElement;
            if (parentElement) {
                const inputToClear = parentElement.querySelector('input');
                if (inputToClear) {
                    inputToClear.value = '';

                    const fieldName = action.dataset.field;
                    if (fieldName && state.hasOwnProperty(fieldName)) {
                        delete state[fieldName];
                    }
                }
            }
        }

        const compare = createComparison(defaultRules);
        return data.filter(row => compare(row, state));
    }
}