export function getParsedFormData(formData: FormData) {
  return Object.fromEntries(formData.entries());
}
