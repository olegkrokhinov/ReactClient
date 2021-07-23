import React, { useState } from 'react';
import urljoin from 'url-join';
const URL = "http://localhost:4000/";

const ToyListElement = ({toy, setSelectedToy, ...props}) => {
  
  function onEditHandler(){
    setSelectedToy(toy);
    props.history.push('/editToy');
  }

  return (
    <div id = {toy._id}>
      <div><h3>ToyListElement:</h3></div>
        <p>Name: {toy.name}</p>
        <p>Description: {toy.description}</p>
        <p>Id: {toy._id}</p>
        <img src={urljoin(URL, toy.imageUploadPath)} alt={urljoin(URL, toy.imageUploadPath)} weight='100' height='100'></img>
        <button onClick={onEditHandler}> Edit </button>
    </div>
  );
  
};

export default ToyListElement;

 