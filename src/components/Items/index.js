import React, { useEffect, useState } from 'react'
import Item from '../Item';
import ItemsList from '../ItemList';

export default function Items({...props}) {
  const [itemListModifyed, setItemlistModifyed] = useState(true);
  const [selectedItem, setSelectedItem] = useState('');
	const [itemMode, setItemMode] = useState('view');

  const onAddHandler = (event)=>{
    setSelectedItem('');
    setItemMode('add');
  }

  return  <div>
            <div>
              <button  onClick={onAddHandler}> Add item </button>
            </div>
            <div>
              <ItemsList {...props}
                selectedItem ={selectedItem} 
                setSelectedItem={setSelectedItem} 
                itemMode = {itemMode} 
                setItemMode = {setItemMode}
                itemListModifyed = {itemListModifyed}
                setItemlistModifyed = {setItemlistModifyed}
              />  	
	          </div>  
	          <div>
              {((itemMode=='add')||(selectedItem))&&
              <Item { ...props}  
                selectedItem ={selectedItem} 
                setSelectedItem={setSelectedItem} 
                itemMode = {itemMode} 
                setItemMode = {setItemMode}
                setItemlistModifyed = {setItemlistModifyed}
              />}
	          </div>  
          </div>
  }
