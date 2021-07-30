import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import urljoin from 'url-join';

const URL_HOME = "http://localhost:4000/";
const URL_ITEMS = "http://localhost:4000/items/";

export default function Item(
    {currentUser, 
    selectedItem, 
    setSelectedItem, 
    itemMode, 
    setItemMode, 
    setItemlistModifyed, 
    ...props}) {
  
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [imageUploadPath, setImageUploadPath] = useState('');
  const [saveItemResultMessage, setSaveItemResultMessage] = useState(''); 
  const [itemImageFile, setItemImageFile] = useState('');  
  const [itemImagePreviewUrl, setItemImagePreviewUrl] = useState('');  

  useEffect(()=>{
    fetchItem('get', selectedItem)
    .then (item => {
      setName(item.name);
      setDescription(item.description);
      setImageUploadPath(item.imageUploadPath);
    })
    .catch(err => {
      
    })  
  }, [selectedItem]);

  useEffect (()=>{
    if (itemMode == 'add') {
      setName('');
      setDescription('');
      setImageUploadPath('');
      setItemImageFile('');
      setItemImagePreviewUrl('');    
    }
  },[itemMode])

  function handleNameChange(event) {
    setName(event.target.value);
  }
  
  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }
  
  function handleItemImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      setImageUploadPath('');
      setItemImageFile(file);
      setItemImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  function fetchItem(action, itemId=''){
    const methodSelector = {
      'add': 'POST',
      'edit': 'PUT',
      'get': 'GET'
    }
    const options = { 
      method: methodSelector[action], 
      headers: { 
        'Authorization': currentUser.userAccessToken }, 
    }
    if (action=='get') {
      options.headers = {...options.headers}
    } else {
      const formData = new FormData();
      formData.append('itemId', selectedItem);
      formData.append('itemImageFile', itemImageFile);
      formData.append('emptyImage', 'false');
      formData.append('itemName', name);
      formData.append('itemDescription', description);
      options.body = formData
    } 

    return new Promise((resolve, reject)=>{
      fetch(URL_ITEMS + itemId, options)
      .then(res => checkHtppError(res))
      .then(res => res.json())
      .then(json => resolve(json))        
      .catch(reject); 
    })
  }

  function checkHtppError(res){
    if (res.ok) {
      return res;
    } else {
      let message = `Error ${res.status}: ${res.statusText}`;
      throw new Error(message)
    }; 
  };

  function handleSubmit(event) {
    event.preventDefault();
    fetchItem(itemMode)
    .then((item)=>{
      setItemlistModifyed((value)=>(!value));
      setSelectedItem('');
       setItemMode('view');
    })
    .catch(error => {
      setSaveItemResultMessage('Save item catch error: '+ error.message);
    })
  }

  return (
    <div>
      <div><h3>Item:</h3></div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={name} onChange={handleNameChange} />
        <label>Description:</label>
        <input name="description" value={description} onChange={handleDescriptionChange} />
        <label>Item image:</label>
        <input name="image" type="file" onChange={handleItemImageChange} />
       
        {imageUploadPath&&(<img src={urljoin(URL_HOME, imageUploadPath)} alt={urljoin(URL_HOME, imageUploadPath)} weight='100' height='100'></img>)}
        {!imageUploadPath&&(<img src={itemImagePreviewUrl} height='100' weight='100' alt="---"></img>)}
  
        {!(itemMode=='view') && 
          <input type="submit" value="Save" />}

        {saveItemResultMessage &&  
          <div>
            {saveItemResultMessage}
          </div>
        }
      </form>
    </div>
  );
  
};


 