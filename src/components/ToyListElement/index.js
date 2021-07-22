import React, { useState} from 'react';
import urljoin from 'url-join';
import path from 'path';

const URL = "http://localhost:4000/";

export default function ToyListElement(props) {
  
  function onEditHandler(){
    props.setSelectedToy(props.toy);
    props.history.push("/editToy");
    window.location.reload();
  }

  return (
    <div id = {props.toy._id}>
      <div><h3>ToyListElement:</h3></div>
        <p>Name: {props.toy.name}</p>
        <p>Description: {props.toy.description}</p>
        <p>Id: {props.toy._id}</p>
        <img src={urljoin(URL, props.toy.imageUploadPath)} alt={urljoin(URL, props.toy.imageUploadPath)} weight='100' height='100'></img>
        <button onClick={onEditHandler}> Edit </button>
    </div>
  );
  
};



 