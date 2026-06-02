export function getFormData(formData: FormData) {
  return Object.fromEntries(formData.entries());
}
