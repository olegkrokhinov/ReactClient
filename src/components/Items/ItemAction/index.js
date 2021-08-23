import React from 'react'
import AddItem from '../AddItem'
import EditItem from '../EditItem'
import ViewItem from '../ViewItem'

export default function ItemAction({
    selectedItemId,
    setSelectedItemId,
    setItemlistModifyed,
    itemAction,
    setItemAction,
    ...props}) {

  return  <> 
             
      {(itemAction==='add')&&
        <AddItem { ...props}  
          setSelectedItemId={setSelectedItemId} 
          setItemlistModifyed = {setItemlistModifyed}
          itemAction = {itemAction}
          setItemAction = {setItemAction}
        />
      }
      {(itemAction==='edit')&&
        <EditItem { ...props}  
          selectedItemId = {selectedItemId}
          setSelectedItemId = {setSelectedItemId} 
          setItemlistModifyed = {setItemlistModifyed}
          itemAction={itemAction} 
          setItemAction = {setItemAction}
        />
      }
      {(itemAction==='view')&&
        <ViewItem { ...props}  
          selectedItemId = {selectedItemId}
          itemAction={itemAction}
          setItemAction = {setItemAction}
        />
      }
  
         </>
}