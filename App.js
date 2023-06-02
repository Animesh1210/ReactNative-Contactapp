import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,TextInput } from 'react-native';

export default function App() {
  return (
    <View  style={{flex:1, backgroundColor:"#DAD7D7"}}>
      <TextInput
        placeholder='Search'
        placeholderTextColor={"#000"}
        
        style={{
          backgroundColor: "#154c79",
          height:45,
          fontSize: 22,
          padding: 5,
          paddingLeft: 10,
         }}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
