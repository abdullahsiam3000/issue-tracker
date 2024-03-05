export function capitalizeFirstLetter(str: string) {
  // Check if the input is not empty
  if (str && typeof str === 'string') {
    // Capitalize the first letter and concatenate the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1)
  } else {
    // Return an empty string or handle the error as needed
    return ''
  }
}
