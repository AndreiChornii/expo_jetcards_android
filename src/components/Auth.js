import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

const Auth = ({login, password}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    console.log('Auth');

    
    // console.log(data);
}