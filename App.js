import { useEffect, useState } from "react";
import { Text, View, TextInput,FlatList} from "react-native";
import * as Contacts from "expo-contacts";
export default function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadContacts = async () => {
    //here I take permission for contact app&& save its state
    const permission = await Contacts.requestPermissionsAsync();
    {
      //fixed the deprecated way of fetching pemission
      if (permission.status !== "granted") {
        return;
      }
    }
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      //this should in theory save only name and phone number from objects, but it saves much more, beyond my understanding for now
      //maybe the api returns some fields by default no matter what
    });
    console.log(data);
    setContacts(data);
  };
  const ContactToDisplay = contacts.filter((contact) => {
    //prev implementation was filtering every substring search provided to it, many edges cases, Fixed it with startsWith()
    const fullName = `${contact.firstName} ${contact.lastName}`;
    return fullName.toLowerCase().startsWith(searchTerm.toLowerCase());
  });
  
  const ContactItem = ({ item }) => (
    //this is just to iterate over flatlist ig? picked this from native docs
    <View style={{ minHeight: 70, padding: 5 }}>
        <Text style={{ color: '#bada55', fontWeight: 'bold', fontSize: 40 }}>
          {item.firstName + ' '}
          {item.lastName}
        </Text>
        {item.phoneNumbers && item.phoneNumbers.length > 0 && (
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {item.phoneNumbers[0].number}
          </Text>
        )}
    </View>
    
);
  useEffect(() => {
    {
      //this will call load contacts on every rendercycle- fix dependancy to something better || this would
      //help to keep contact list updated when someone adds a new contact inside phone, it should update??
    }
    loadContacts();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingVertical: 25 }}>
      {/*hard coded padding to fix the notch and notification bar space, need a safeview area thing but for andriod */}
      <TextInput
        placeholder="Search"
        placeholderTextColor={"#fff"}
        style={{
          backgroundColor: "#5C5B5B",
          height: 45,
          fontSize: 22,
          padding: 5,
          paddingLeft: 10,
          borderRadius: 180,
          marginTop: 10,
          margin: 5,
          // borderColor:"#fff",
          // borderWidth:0.2
        }}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff" /*just to check the area im working with*/,
        }}
      >
        <FlatList
          data={ContactToDisplay}
          renderItem={({ item }) => <ContactItem item={item} />}
          //this calls a render pr contact ,a predefined cardish render, mapping each contact to it and looping over it
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50
              }}
            >
              <Text style={{ color: '#000' }}>No Contacts Found</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
