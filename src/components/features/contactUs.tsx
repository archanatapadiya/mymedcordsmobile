/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
//  import type {Node} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   ImageBackground,
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
  //  Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';

 import Header from '../header';
 import Carousel from '../carousel';

 const image = { uri: "https://reactjs.org/logo-og.png" };

 
 const Section = ({children, title}) => {
   const isDarkMode = useColorScheme() === 'dark';
   return (
     <View style={styles.sectionContainer}>
       <ImageBackground source={image} style={styles.image}></ImageBackground>
       <Text
         style={[
           styles.sectionTitle,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {title}
       </Text>
       <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
         {children}
       </Text>
     </View>
   );
 };
 
 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   return (
     <SafeAreaView style={backgroundStyle}>
        {/* <ImageBackground source={image} style={styles.image}></ImageBackground> */}
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}>
         <Header />
         <Carousel />
         <View
           style={{
             backgroundColor: isDarkMode ? Colors.black : Colors.white,
           }}>
             {/* <ImageBackground source={image} style={styles.image}></ImageBackground> */}
           <Section title="About">
           Sathe Hospital has always felt like home to many in the neighbouring community owing to the excellent treatment given by its consultants, first by Dr. AG Sathe, the pioneer of Sathe Hospital and then by Dr. Ajit Gurjar and Dr. AC Joshi, who have nurtured the hospital for several decades. The warm treatment rendered here by the staff is unparalleled and the greatest sense of achievement for the hospital is the faith its patients have on the medical treatment given here.
           </Section>
           <View style={{backgroundColor:'#D9E3F0'}}>
           <Section title="CONSULTATIONS">
           Our consultations are experienced and qualified to provide the best diagnosis and treatment to the patient.
           </Section>
           </View>
           <View style={{backgroundColor:'rgba(130, 147, 161, 0.8)'}}>
           <Section title="DIAGNOSTICS">
           We have the state of the art equipment that enables us to deliver quick and accurate results that aids the consultants to plan the course of action for the patient.
           </Section>
           </View>
           <View style={{backgroundColor:'#D9E3F0'}}>
           <Section title="SURGERY" >
           Our experienced team of surgeons works hard to ensure quick recovery through minimum pain and a short hospital stay.
           </Section>
           </View>
           <View style={{backgroundColor:'rgba(130, 147, 161, 0.8)'}}>
           <Section title="HOSPICE CARE">
           This type of care aims at providing nursing and comfort to patients who have chosen to discontinue any medical treatment for their condition.
           </Section>
           </View>
           {/* <LearnMoreLinks /> */}
         </View>
       </ScrollView>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
   image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
 });
 
 export default App;
 