import React, { useCallback } from 'react';
import { MdEmail } from 'react-icons/md';
import { IoHome } from 'react-icons/io5';

// A reusable Input component for form fields
const InputField = React.memo(({ id, type, name, value, onChange, placeholder, required, pattern }) => (
  <input
    type={type}
    id={id}
    name={name}
    value={value || ''}
    onChange={onChange}
    className="w-full p-3 border border-gray-300 rounded"
    placeholder={placeholder}
    required={required}
    pattern={pattern}
  />
));

// A reusable Select component for dropdown selections
const SelectField = React.memo(({ id, name, value, onChange, options, placeholder, required }) => (
  <select
    id={id}
    name={name}
    value={value || ''}
    onChange={onChange}
    className="w-full p-3 border border-gray-300 rounded bg-white"
    required={required}
  >
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
));

const Inputs = React.memo(({ formData, handleChange }) => {
  // Province and City options for selects
  const provinces = ["Punjab", "Sindh", "KPK", "Balochistan", "Gilgit-Baltistan"];
  const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar", "Quetta"];

  // Using useCallback to memoize handleChange function to avoid unnecessary re-renders
  const optimizedHandleChange = useCallback((e) => {
    handleChange(e);
  }, [handleChange]);

  return (
    <div className="space-y-4 p-4 md:py-6 md:pr-2 md:pl-6">
      {/* Contact Section */}
      <div className="space-y-2">
        <div className="flex justify-start items-center gap-2">
          <label htmlFor="email" className="block text-xl font-playfair font-semibold">
            Contact
          </label>
          <MdEmail className="text-xl" />
        </div>
        <InputField
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={optimizedHandleChange}
          placeholder="Email"
          required
        />
      </div>

      {/* Delivery Information Section */}
      <div className="space-y-2">
        <div className="flex justify-start items-center gap-2">
          <div className="font-semibold text-xl font-playfair">Delivery</div>
          <IoHome className="text-xl" />
        </div>

        <div className="space-y-4">
          <InputField
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={optimizedHandleChange}
            placeholder="First Name"
            required
          />
          <InputField
            id="secondName"
            type="text"
            name="secondName"
            value={formData.secondName}
            onChange={optimizedHandleChange}
            placeholder="Second Name"
          />
          <SelectField
            id="province"
            name="province"
            value={formData.province}
            onChange={optimizedHandleChange}
            options={provinces}
            placeholder="Select Province"
            required
          />
          <SelectField
            id="city"
            name="city"
            value={formData.city}
            onChange={optimizedHandleChange}
            options={cities}
            placeholder="Select City"
            required
          />
          <InputField
            id="area"
            type="text"
            name="area"
            value={formData.area}
            onChange={optimizedHandleChange}
            placeholder="Area"
            required
          />
          <InputField
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={optimizedHandleChange}
            placeholder="Complete Address"
            required
          />
          <InputField
            id="apartment"
            type="text"
            name="apartment"
            value={formData.apartment}
            onChange={optimizedHandleChange}
            placeholder="Apartment (Optional)"
          />
        </div>

        {/* Mobile Number and Second Number */}
        <InputField
          id="mobile"
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={optimizedHandleChange}
          placeholder="Mobile (03xxxxxxxxx)"
          required
          pattern="03[0-9]{9}"
        />
        <InputField
          id="secondNumber"
          type="tel"
          name="secondNumber"
          value={formData.secondNumber}
          onChange={optimizedHandleChange}
          placeholder="Second Number (Optional)"
        />
        <InputField
          id="postalCode"
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={optimizedHandleChange}
          placeholder="Postal Code (Optional)"
        />
      </div>
    </div>
  );
});

export default Inputs;

