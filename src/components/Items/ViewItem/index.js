import React, { useState, useEffect } from 'react';
import urljoin from 'url-join';
import { getItemFromDb } from '../itemFetch';

const URL_HOME = "http://localhost:4000/";

export default function ViewItem(
    { selectedItemId, 
      setItemAction,
     ...props}) {
  
  const [itemName, setItemName] = useState(''); 
  const [itemDescription, setItemDescription] = useState(''); 
  const [itemUploadedImagePath, setItemUploadedImagePath] = useState('');

  useEffect(()=>{
    getItemFromDb(selectedItemId)
    .then (item => {
      setItemName(item.name);
      setItemDescription(item.description);
      setItemUploadedImagePath(urljoin(URL_HOME, item.imagePath));
    })
    .catch(err => {
    })  
  }, [selectedItemId]);

  return (
    <div>
      <div><h3>ViewItem:</h3></div>
        <label>Name:</label>
        <input name = "name" value = {itemName} />
        <label>Description:</label>
        <input name = "description" value = {itemDescription} />
        <img src={itemUploadedImagePath} height='100' weight='100' alt="---"></img>
    </div>
  );
  
};


 