import firebase from './firebase.config';
import React,{useState,useEffect} from 'react';
import { View } from 'react-native';
import {
  StyleSheet,
  Alert,
  Text,
  List,
  Button,
  ScrollView,
  TextInput,
  ActivityIndicator,
  FlatList,
  ListItem,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated
} from 'react-native';
import { render } from 'react-dom';
import { withTheme } from 'react-native-elements';
import { Linking } from 'react-native';
import InsetShadow from 'react-native-inset-shadow';

const headerheightprop = "30%";
const bodyheightprop = "70%";
const {width, height} = Dimensions.get('window');

function App() {
  const [articles,setArticles]=useState([]);
  const [loading, setLoading]=useState(false);
  
  const ref = firebase.firestore().collection("articles")
  const opa = useState(new Animated.Value(0))[0]
  
  function fadeOut(){
    Animated.timing(opa, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true
    }).start()
  }

  function getArticles(){
    setLoading(true);
    ref.orderBy('date', 'desc').onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
        setArticles(items);
        fadeOut();
        setTimeout(() => setLoading(false), 4000)
      })
    })
  }
  useEffect(() => {
    getArticles();
  }, []);

  if(loading){
    return(
      <Animated.View style={styles.splash}>
        <Image source={require('./assets/TransparentApp.png')} style={{width: 350, height: '40%', marginTop:'70%',}}></Image>
        <Text style={{color: '#333', fontSize: 35, fontWeight: '500', marginTop: -70, shadowColor: 'rgba(0,0,0, .4)', shadowOffset: {height: 1, width: 1} , shadowOpacity: 0.8}}>No Blink News</Text>
      </Animated.View>
    )
  }

  

  return (
      <View>
        {/*
        <View style={styles.splash, {opacity:0, height: 0}}>
          <Image source={require('./assets/TransparentApp.png')} style={{width: 300, height: 300, marginTop:'60%',}}></Image>
          <Text style={{color: 'white', fontSize: 30, marginTop: -70, shadowColor: 'rgba(0,0,0, .4)', shadowOffset: {height: 2, width: 2} , shadowOpacity: 0.8}}>No Blink News</Text>
          <Text style={{color: 'white', marginTop: '60%', fontSize: 20, opacity: 0.76}}>Swipe Up To Begin</Text>
          <Image source={require('./assets/chevron-up-solid.png')} style={{padding: 20, width: 45, height:36, marginTop: '5%', opacity:0.2, tintColor:'orange'}}></Image>
          <Image source={require('./assets/chevron-up-solid.png')} style={{padding: 20, width: 45, height:36, marginTop: -16, opacity:0.04, tintColor:'orange'}}></Image>
        </View>
        */}
        
        <FlatList
          keyExtractor={(item,index)=>index.toString}
          data={articles}
          snapToAlignment={'start'}
          decelerationRate={0.9}
          showsVerticalScrollIndicator={false}
          snapToInterval={Dimensions.get('window').height}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.container}> 
                  <Image source={require('./assets/TransparentApp.png')} style={{width: 86, height: 86, marginLeft:-26, marginTop: 10}}></Image>
                  <Text style = {styles.title}>{item.header}</Text>
                  <Text style = {styles.datetext}>{item.date}</Text>
                  <View style={styles.imagecontainer}>
                    <Image source={{uri: item.image}} style={styles.bigimage} resizeMode='cover'></Image>
                    {/*
                    <TouchableOpacity onPress={ () => Linking.openURL(item.link)}style={styles.circlebutton}>
                    <Image source={require('./assets/heart.png')} style={{width: 20, height: 20, }}></Image>
                    </TouchableOpacity>
                    */}
                  </View>
                  <Text style={styles.bodytext}>{item.content}</Text>
                  <TouchableOpacity onPress={ () => Linking.openURL(item.link)}style={styles.button}>
                    <Text style={styles.buttontext}>Read More</Text>
                  </TouchableOpacity>
            </View>
          )}
        /> 
      </View>
      
  );
}

const styles = StyleSheet.create({
  imagecontainer: {
    height: '25%'
  },
  circlebutton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 0,
    alignContent:"center",
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#B84343',
    position: 'absolute',
    right: 10,
    bottom: -19,
  },
  bigimage: {
    width: '115%' ,
    height: '100%',  
    opacity: 1,
    marginLeft:-20,
  },
  splash: {
    width,
    height,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  buttontext: {
    fontSize: 20,
    color: '#B84343',
    fontWeight: '600',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderColor: '#518C8E',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    width: '70%',
    height: 48,
    position:'absolute',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 0.8, // IOS
    shadowRadius: 1, //IOS
    bottom: 40,
    left: '23%'
  },
  title: {
    fontSize: 28,
    color: '#1E155B',
    fontWeight: '500',
    marginTop: -10,
    fontFamily:'Helvetica'
  },
  container: {
    width,
    height,
    padding: 20,
  },
  datetext: {
    fontSize: 14,
    color: '#000',
    paddingTop: 10,
    paddingBottom: 20,
    fontWeight: '600',
  },
  bodytext: {
    marginTop: 15,
    color: '#000',
    letterSpacing: 0.3,
    fontSize: 17,
    fontWeight: '400',
    fontFamily: 'Geeza Pro'
  },
});

export default App;