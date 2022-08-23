

import "firebase/firestore"; //Muuten jees mutta ulkoasu
import React, { useEffect, useState } from 'react';
import { Card, Button, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import { firebase } from '@firebase/app';




const firebaseConfig = {
  apiKey: "AIzaSyD4Z3XHL-M9RVosKv9aE3EFOQ9T9kbryJw",
  authDomain: "shoppinglist-c3215.firebaseapp.com",
  projectId: "shoppinglist-c3215",
  storageBucket: "shoppinglist-c3215.appspot.com",
  messagingSenderId: "457169456979",
  appId: "1:457169456979:web:9ca30e1b86f292c9a2dba6",
  measurementId: "G-D02N8WEP2L"
};
firebase.initializeApp(firebaseConfig);
function App() {

  const classes = useStyles();
  const[item, setItem] = useState("");
  const[count, setCount] = useState(1);
  // loading state
  const[loading, setLoading] = useState(true);
  // shopping list items state
  const[items, setItems] = useState([]);

  // load shopping list items
  useEffect(()=> {
    const fetchData = async () => {
      // database
      const db = firebase.firestore();
      // data
      const data = await db.collection("items").get();
      // shopping list items: name, count and id
      const items = data.docs.map(doc => {
        return  { 
          name: doc.data().name, 
          count: doc.data().count, 
          id: doc.id 
        };
      });
      // set states
      setItems(items);
      setLoading(false);
    }
    // start loading data
    fetchData();
  },[]); // called only once

  // render loading... text
  if (loading) return (<p>Loading...</p>);

  // create shopping list items
  const sh_items = items.map( (item, index) => {
    return (<Card className={classes.list}>{item.name} {item.count}<button variant="contained" className={classes.delete} onClick={() => deleteItem(item)} >Delete</button></Card>);
  });

  
  const addItem = async () => {
    // create a new shopping list item
    let newItem =  { name: item, count: count, id: '' };
    // add to database
    const db = firebase.firestore();
    let doc = await db.collection('items').add(newItem);
    // get added doc id and set id to newItem
    newItem.id = doc.id;
    // update states
    setItems( [...items,newItem]);
    setItem("");
    setCount(1);
  }
  // delete item from database and UI
const deleteItem = async (item) => {
  // remove from db
  const db = firebase.firestore();
  db.collection('items').doc(item.id).delete();
  // delete from items state and update state
  let filteredArray = items.filter(collectionItem => collectionItem.id !== item.id);
  setItems(filteredArray);  
}

  // render shopping list
  return (
    <div className={classes.root}>

      <Card variant='h1' className={classes.card}>Shopping List</Card>
      <div className={classes.main}>
      <TextField variant="filled" className={classes.textField} placeholder="Write item's name" onChange={e => setItem(e.target.value)}></TextField>
      <div className={classes.label}>
      <InputLabel id="test-select-label">Count:</InputLabel>
      
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={count} 
          onChange={e => setCount(e.target.value)}
          label="Select count">
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
        </div>
      <Button onClick={() => addItem()} >Add</Button>
      </div>
      
        {sh_items}
      
    </div>
  );
  
}
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: '100vh',
    padding: '30px 10px 20px',
  },
  main: {
    display: 'inline-flex',
  },
  p: {
    marginRight: '100px',
  },
  delete: {
    background: 'transparent',
    marginLeft: '50px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    
    
  },
  label: {
    display: 'inline-block',
    paddingLeft: '10px',
  },
  list: {
    background: 'linear-gradient(0deg, #FF8E53 100%, #FE6B8B 20%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '20px 10px 20px ',
    fontSize: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20px',
    marginBottom: '10px',
    marginTop: '5px',
  },
  card: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '20px 10px 20px',
    fontSize: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20px',
    marginBottom: '10px',
  }
 
});
export default App;
