// src/components/SymptomForm.js
import React, { useState } from 'react';
import { Box, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Checkbox, TextField, Typography, Button } from '@mui/material';

const SymptomForm = () => {
  const [formData, setFormData] = useState({
    headache: '',
    medicationTaken: '',
    medications: [],
    sensitivity: '',
    nausea: '',
    sleep: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevState => {
      const medications = checked
        ? [...prevState.medications, value]
        : prevState.medications.filter(med => med !== value);
      return {
        ...prevState,
        medications
      };
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Have you experienced any of the following today:
      </Typography>

      <FormControl component="fieldset">
        <FormLabel component="legend">1. Headache</FormLabel>
        <RadioGroup row name="headache" value={formData.headache} onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>

        {formData.headache === 'yes' && (
          <Box sx={{ pl: 3 }}>
            <FormLabel component="legend">Did you take any medication for it?</FormLabel>
            <RadioGroup row name="medicationTaken" value={formData.medicationTaken} onChange={handleChange}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>

            {formData.medicationTaken === 'yes' && (
              <Box sx={{ pl: 3 }}>
                <FormLabel component="legend">Which medication(s) did you take, check all that apply:</FormLabel>
                <FormControlLabel
                  control={<Checkbox value="Triptans" checked={formData.medications.includes('Triptans')} onChange={handleCheckboxChange} />}
                  label="Triptans (e.g. Sumatriptan, Rizatriptan, Zolmitriptan, etc.)"
                />
                <FormControlLabel
                  control={<Checkbox value="NSAIDS" checked={formData.medications.includes('NSAIDS')} onChange={handleCheckboxChange} />}
                  label="NSAIDS (e.g. Acetaminophen, Ibuprofen, Naproxen, etc.)"
                />
                <FormControlLabel
                  control={<Checkbox value="CGRP Monoclonal Antibodies" checked={formData.medications.includes('CGRP Monoclonal Antibodies')} onChange={handleCheckboxChange} />}
                  label="CGRP Monoclonal Antibodies (e.g. erenumab, galcanezumab, fremanezumab, eptinezumb, etc.)"
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Other"
                  value={formData.medications.other || ''}
                  onChange={(e) => handleChange({ target: { name: 'medicationsOther', value: e.target.value } })}
                />
              </Box>
            )}
          </Box>
        )}
      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 3 }}>
        <FormLabel component="legend">2. Sensitivity to light (photophobia) and/or sound</FormLabel>
        <RadioGroup row name="sensitivity" value={formData.sensitivity} onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 3 }}>
        <FormLabel component="legend">3. Nausea and/or vomiting</FormLabel>
        <RadioGroup row name="nausea" value={formData.nausea} onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 3 }}>
        <FormLabel component="legend">4. Did you sleep well last night?</FormLabel>
        <RadioGroup row name="sleep" value={formData.sleep} onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => console.log(formData)}>
        Submit
      </Button>
    </Box>
  );
};

export default SymptomForm;
