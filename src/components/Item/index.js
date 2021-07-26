import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import urljoin from 'url-join';

const URL = "http://localhost:4000/";
const URL_items = "http://localhost:4000/items/";

export default function Item({currentUser, ...props}) {
  
  const { idParam } = useParams();
  
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [imageUploadPath, setImageUploadPath] = useState('');
  const [saveItemResultMessage, setSaveItemResultMessage] = useState(''); 

  const [itemImageFile, setItemImageFile] = useState('');  
  const [itemImagePreviewUrl, setItemImagePreviewUrl] = useState('');  

  useEffect(()=>{

    getItem(idParam)
    .then (item => {
      setName(item.name);
      setDescription(item.description);
      setImageUploadPath(item.imageUploadPath)
    })
    .catch(err => {
      //
    })     

  }, []);


  function handleNameChange(event) {
    setName(event.target.value);
  }
  
  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }
  

  function handleItemImageChange(event) {
    
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      setItemImageFile(file);
      setItemImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  function getItem(itemId){
    
    const body = {itemId: itemId};
    
    return new Promise((resolve, reject)=>{
      fetch(URL_items + itemId, { 
          method: 'GET',
          body: JSON.stringify(body), 
          headers: { 
            'Authorization': currentUser.userAccessToken, 
            'Content-Type': 'application/json', 
          }, 
      })
      //.then(res => checkHtppError(res))
      .then(res => res.json())
      .then(json => resolve(json))        
      .catch(reject); 
    })
  };

  function updateItem(){
    const formData = new FormData();
    formData.append('itemImageFile', itemImageFile);
    formData.append('itemName', name);
    formData.append('itemDescription', description);
    
    return new Promise((resolve, reject)=>{
      fetch(URL_items, { 
          method: 'POST',
          body: formData, 
          headers: { Authorization: currentUser.userAccessToken }, 
      })
      //.then(res => checkHtppError(res))
      .then(res => res.json())
      .then(json => resolve(json))        
      .catch(reject); 
    })
  };

  function handleSubmit(event) {
    event.preventDefault();
    updateItem()
    .then((item)=>{
      props.history.push("/items");
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
        {imageUploadPath? 
          (<img src={urljoin(URL, imageUploadPath)} alt={urljoin(URL, imageUploadPath)} weight='100' height='100'></img>) 
          : 
          (<img src={itemImagePreviewUrl} height='200' weight='200' alt="---"></img>)
        }
        <input type="submit" value="Save" />

        {saveItemResultMessage && ( 
            <div>
              {saveItemResultMessage}
            </div>
        )}

      </form>
    </div>
  );
  
};


 