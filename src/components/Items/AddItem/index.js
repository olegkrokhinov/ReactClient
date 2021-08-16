import React, { useState} from 'react';
import { addItemToDb } from '../itemFetch';
import ItemImage from '../ItemImage';

export default function AddItem(
    {setItemlistModifyed, 
     setSelectedItemId,
     setItemAction,
     ...props}) {
  
  const [itemName, setItemName] = useState(''); 
  const [itemDescription, setItemDescription] = useState(''); 
  const [localImageFile, setLocalImageFile] = useState(''); 

  const [saveItemResultMessage, setSaveItemResultMessage] = useState(''); 
   
 
  function handleNameChange(event) {
    setItemName(event.target.value);
  }
  
  function handleDescriptionChange(event) {
    setItemDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    addItemToDb(itemName, itemDescription, localImageFile)
    .then((item)=>{
      setItemlistModifyed((value)=>(!value));
      setSelectedItemId(item._id);
      setItemAction('');
    })
    .catch(error => {
      setSaveItemResultMessage('Save item catch error: '+ error.message);
    })
  }

  return (
    <div>
      <div><h3>AddItem:</h3></div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={itemName} onChange={handleNameChange} />
        <label>Description:</label>
        <input name="description" value={itemDescription} onChange={handleDescriptionChange} />
        <ItemImage itemUploadedImagePath='' setLocalImageFile={setLocalImageFile}/>
        <input type="submit" value="Save" />
        {saveItemResultMessage &&  
          <div>
            {saveItemResultMessage}
          </div>
        }
      </form>
    </div>
  );
  
};


 