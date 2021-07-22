import React, { useState, useRef} from 'react';
import urljoin from 'url-join';

const URL = "http://localhost:4000/";
const URL_Toys = "http://localhost:4000/toys/";

export default function Toy(props) {
  
  const [name, setName] = useState(props.selectedToy.name); 
  const [description, setDescription] = useState(props.selectedToy.description); 
  const [saveItemResultMessage, setSaveItemResultMessage] = useState(''); 

  const [toyImageFile, setToyImageFile] = useState('');  
  const [toyImagePreviewUrl, setToyImagePreviewUrl] = useState( (!props.selectedToy.imageUploadPath) || urljoin(URL, props.selectedToy.imageUploadPath));  

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

    let method = {
      false: 'PUT',
      true: 'POST'
    };
    props.setSelectedToy('');
        return new Promise((resolve, reject)=>{
        fetch(URL_Toys, { 
            method: method[!props.selectedToy._id], 
            body: formData,  
        })
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
      window.location.reload();
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
        <img src={toyImagePreviewUrl} alt="---"></img>

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


 