import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Szobak() {
   
    const [szobak, setSzobak] = useState([]);
  

    useEffect(() => {
        axios.get('http://localhost:6666/szobak')
            .then(response => {
                szobak(response.data);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    }, []); 
    
}

export default Szobak;