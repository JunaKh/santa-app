import React, { useState } from 'react';

const SantaForm = () => {
  const [formData, setFormData] = useState({
    dream: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
      <form onSubmit={handleSubmit}>
        <label>
          Dream:
          <input
              type="text"
              name="dream"
              value={formData.dream}
              onChange={handleChange}
              maxLength={100}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
  );
};

export default SantaForm;
