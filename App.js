import { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  Modal,
  Button,
} from "react-native";
import * as Contacts from "expo-contacts";
import { MaterialIcons } from "@expo/vector-icons";
export default function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedcontact] = useState(null);

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
    setContacts(data);
  };
  const ContactToDisplay = contacts.filter((contact) => {
    //prev implementation was filtering every substring matching the search,This gave many unexpected behaviours, Fixed it with startsWith()
    const fullName = `${contact.firstName} ${contact.lastName}`;
    return fullName.toLowerCase().startsWith(searchTerm.toLowerCase());
  });
  const openContactModal = (contact) => {
    setSelectedcontact(contact);
  };

  const closeContactModal = () => {
    setSelectedcontact(null);
  };
  const ContactItem = ({ item }) => (
    <Pressable onPress={() => openContactModal(item)}>
      <View
        style={{
          minHeight: 60,
          padding: 5,
          backgroundColor: "#3e607b",
          paddingLeft: 10,
          borderBottomWidth: 0.2,
        }}
      >
        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 20 }}>
          {item.firstName + " "}
          {item.lastName}
        </Text>
        {item.phoneNumbers && item.phoneNumbers.length > 0 && (
          <Text style={{ color: "#000", fontWeight: "bold" }}>
            {item.phoneNumbers[0].number}
          </Text>
        )}
      </View>
    </Pressable>
  );
  console.log(selectedContact);

  useEffect(() => {
    {
      //this will call load contacts on every rendercycle- fix dependancy to something better || this would
      //help to keep contact list updated when someone adds a new contact inside phone, it should update??
    }
    loadContacts();
  }, []);
  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#3e607b", paddingVertical: 28 }}>
      {/*hard coded padding to fix the notch and notification bar space*/}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#01497c",
          height: 45,
          borderRadius: 180,
          marginTop: 10,
          margin: 5,
        }}
      >
        <TextInput
          placeholder="Search"
          placeholderTextColor="#fff"
          style={{
            flex: 1,
            fontSize: 22,
            padding: 5,
            paddingLeft: 10,
            color: "#fff",
          }}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {searchTerm.length > 0 ? ( //to hide button when no button text inside field
          <Pressable onPress={clearSearchTerm} style={{ paddingRight: 10 }}>
            <MaterialIcons name="close" size={24} color="#fff" />
          </Pressable>
        ) : null}
      </View>
      <View style={{ flex: 1, backgroundColor: "#3e607b" }}>
        <FlatList
          data={ContactToDisplay}
          renderItem={({ item }) => <ContactItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 50,
              }}
            >
              <Text style={{ color: "#000" }}>No Contacts Found</Text>
            </View>
          )}
        />
      </View>
      <Modal
        visible={selectedContact !== null}
        animationType="slide"
        onRequestClose={closeContactModal} //this handles when someone exits using back instead of given button
        hardwareAccelerated={true} //should help with opening window faster
      >
        <View style={{ flex: 1, backgroundColor: "#0d3d56", padding: 20 }}>
          {selectedContact && (
            <View>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 25 }}>
                {selectedContact.firstName + " "}
                {selectedContact.lastName}
              </Text>
              {selectedContact.phoneNumbers &&
                selectedContact.phoneNumbers.length > 0 && (
                  <Text
                    style={{ color: "#000", fontWeight: "bold", fontSize: 22 }}
                  >
                    {selectedContact.phoneNumbers[0].number}
                  </Text>
                )}
            </View>
          )}
          <View style={{ marginTop: 40 }}>
            <Button onPress={closeContactModal} title="Back" color="#841584">
              <Text style={{ color: "#bad555", fontSize: 18 }}>Close</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}
