import React, { useState } from 'react';

const Symptoms = () => {
  const [checkedState, setCheckedState] = useState({
    fever: false,
    headache: false,
    fatigue: false,
    // add more symptoms here
  });

  const handleOnChange = (symptom) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [symptom]: !prevState[symptom],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(checkedState);
    // send the selected symptoms to the backend API here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select your symptoms:</h2>
      <div>
        <input
          type="checkbox"
          id="fever"
          name="fever"
          checked={checkedState.fever}
          onChange={() => handleOnChange('fever')}
        />
        <label htmlFor="fever">Fever</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="headache"
          name="headache"
          checked={checkedState.headache}
          onChange={() => handleOnChange('headache')}
        />
        <label htmlFor="headache">Headache</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="fatigue"
          name="fatigue"
          checked={checkedState.fatigue}
          onChange={() => handleOnChange('fatigue')}
        />
        <label htmlFor="fatigue">Fatigue</label>
      </div>
      {/* add more symptoms here */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Symptoms;