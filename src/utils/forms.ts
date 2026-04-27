export function getFormData(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  return data;
}
