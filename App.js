import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,TextInput,SafeAreaView,ScrollView } from 'react-native';

export default function App() {
  return (
    <View  style={{flex:1, backgroundColor:"#fff", paddingVertical:25}}>
      {/*hard coded padding to fix the notch and notification bar space, need a safeview area thing but for andriod */}
        <TextInput
        placeholder='Search'
        placeholderTextColor={"#fff"}
        style={{
          backgroundColor: "#5C5B5B",
          height:45,
          fontSize: 22,
          padding: 5,
          paddingLeft: 10,
          borderRadius: 180,
          marginTop:10,
          margin:5,
          // borderColor:"#fff",
          // borderWidth:0.2
         }}
        />
        <View style={{flex:1,backgroundColor:"#fff" /*just to check the area im working with*/}}> 
         <Text>
          inside second panel
         </Text>
        </View>

    </View>
    
  );
}


