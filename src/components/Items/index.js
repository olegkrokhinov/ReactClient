import React, { useEffect, useState } from 'react'
import Item from '../Item';
import ItemsList from '../ItemList';

const URL = "http://localhost:4000/";

export default function Items({...props}) {
  
  const [selectedItem, setList] = useState('');
	
  useEffect(()=>{
  
  }     
  , []);

  return  <div>
            <div>
              <ItemsList {...props}/>   	
	    </div>  
	    <div>
	       { selectedItem && <Item {...props}/> }
	    </div>  
          </div>
  }
