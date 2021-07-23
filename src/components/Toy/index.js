import React, { useState, useRef} from 'react';
import urljoin from 'url-join';

const URL_home = "http://localhost:4000/";
const URL_toys = "http://localhost:4000/toys/";

export default function Toy({currentUser, selectedToy, ...props}) {
  
  const [name, setName] = useState(selectedToy.name); 
  const [description, setDescription] = useState(selectedToy.description); 
  const [saveItemResultMessage, setSaveItemResultMessage] = useState(''); 

  const [toyImageFile, setToyImageFile] = useState('');  
  const [toyImagePreviewUrl, setToyImagePreviewUrl] = useState( (!selectedToy.imageUploadPath) || urljoin(URL_home, selectedToy.imageUploadPath));  

  function handleNameChange(event) {
    setName(event.target.value);
  }
  
  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }
  

  function handleToyImageChange(event) {
    
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      setToyImageFile(file);
      setToyImagePreviewUrl(URL.createObjectURL(file));
    }
  };
    
  function saveItem(){
    return fetchToy();
  };

  function fetchToy(){
    const formData = new FormData();
    formData.append('toyImageFile', toyImageFile);
    formData.append('toyName', name);
    formData.append('toyDescription', description);
    
    return new Promise((resolve, reject)=>{
      fetch(URL_toys, { 
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
    saveItem()
    .then((item)=>{
      props.history.push("/toys");
    })
    .catch(error => {
      setSaveItemResultMessage('Save item catch error: '+ error.message);
    })
  }

  return (
    <div>
      <div><h3>Toy:</h3></div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={name} onChange={handleNameChange} />
        <label>Description:</label>
        <input name="description" value={description} onChange={handleDescriptionChange} />
        <label>Toy image:</label>
        <input name="image" type="file" onChange={handleToyImageChange} />
        <img src={toyImagePreviewUrl} height='200' weight='200' alt="---"></img>

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


 