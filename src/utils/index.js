export const handleInputChange = (e, formData, setFormData) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};
