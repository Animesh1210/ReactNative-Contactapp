##to run either Install .apk || run npx expo start ( make sure to install dependencies from npm) and run through expo-go

# pro-edge    
React Native contacts app
##First time creating in ReactNative, previous knowledge of React certainly helped here.
###I've developed this using expo go and using my phone as the build tester

# React native's documentation is very clean and easy to grasp, so is expo's.   (which was certainly helpful)


## I used expo's in built component (expo-contacts) to manage contacts- I felt this was important as working with dummmy contact array felt pointless.
### expo-contact had the functionality to ask the user for permission and to read the contacts from phone.
### also used expo icons, this is just to get that cross ( X ) button I've on search to clear field.


# Components I used from ReactNative
##(Text,View,TextInput,FlatList,Pressable,Modal,Button,StatusBar)
###Text,View,TextInput,Pressable,button are pretty basic components- Ig they're just reactnative's alternative to similar html components.(minus pressable- but it just makes a div clickable)
####FlatList was something new, ig its only purpose is to render lists- it does some mapping internally I would guess and make each list element a renderable card
-Implemented using documentation and stackoverflow
####Modal was fun, Used this to make the popup window when contact is clicked.
#####StatusBar was the safeareaview but for andriod, I was looking for this since the start-  manually hardcoded top padding initially 
to fix things overlapping front camera notch, but this kept breaking layout during apk build for some reason. status bar fixed this, gave it a lovely color too!

# TO BUILD THE APK - I again used expo's services (apk uploaded to github)
Expo Application Services(eas) -
Installed eas cli, configured few thing and built the application as .apk

Apart from this, The only challenging part of the application was implementing how the search works, took a few tries and ways, But I got what I was wishing for.

# I've commented inside code in much more detail about how things are working

# --Animesh Singh 






