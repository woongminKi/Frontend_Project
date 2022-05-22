import React from 'react';
import axios from 'axios';

export const apiData = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}`, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    });

    return data;
  } catch (err) {
    console.error(err);
  }
}
