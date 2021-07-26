import React, { useState } from 'react';
import urljoin from 'url-join';
const URL = "http://localhost:4000/";

const ItemListElement = ({item, ...props}) => {

  return (
    <div id = {item._id}>
        <div><h3>ItemListElement:</h3></div>
        <p>Name: {item.name}</p>
        <p>Description: {item.description}</p>
        <p>Id: {item._id}</p>
        <img src={urljoin(URL, item.imageUploadPath)} alt={urljoin(URL, item.imageUploadPath)} weight='100' height='100'></img>
    </div>
  );
  
};

export default ItemListElement;

 