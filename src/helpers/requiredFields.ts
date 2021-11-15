/**
 * Checks if the keys given exist with a value on the given object.
 * @param object - object to check against
 * @param requiredFields - array holding the names of fields to check for
 * @returns Array of the strings. Each element is a field that was not found in the object
 */
 export const getFieldsWithMissingValue = (object: { [key: string]: any }, requiredFields: string[]) => {
  const emptyFields: string[] = [];

  requiredFields.forEach((field) => {
    if (!object[field]) {
      emptyFields.push(field);
    }
  });

  return emptyFields;
};
