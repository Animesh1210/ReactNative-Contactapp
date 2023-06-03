import {useEffect} from 'react';
import {Text, View ,TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';


export default function App() {
 const loadContacts = async () => {
    const permission = await Permissions.askAsync(Permissions.CONTACTS);
    console.log("inside permission");
  if (permission.status !== 'granted') {
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
    });

    console.log(data);
    console.log("inside loadcontact");
    };
  useEffect(() => {
    {
      //this will call load contacts on every rendercycle- fix dependancy to something better || this would 
      //help to keep contact list updated when someone adds a new contact inside phone, it should update??
    }
   loadContacts();
  }, []);
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