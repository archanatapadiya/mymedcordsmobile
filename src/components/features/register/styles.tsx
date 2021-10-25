import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#E5E5E5',
    flexGrow: 1,
    paddingTop: '5%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    marginHorizontal: '5%',
  },
  inputLabel: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#999999',
    padding: 10,
    marginLeft: '2%',
    marginRight: '2%',
  },
  formErrorMessage: {
    color: '#E90707',
    fontSize: 12,
    textAlign: 'left',
    marginLeft: '5%',
  },

  termsTextStyle: {
    fontSize: 14,
    lineHeight: 16,
    color: '#A2A2A2',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },

  logoStyle: {
    flex:1,
    alignSelf: 'center',
    borderWidth: 1,
    padding: '2%',
    borderRadius: 10,
    width: 70,
    height: 70,
    resizeMode:'cover'
  },

  loginContainer: {
    flex: 1,
    marginTop: '2%',
  },

  textStyle: {
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.03,
    color: '#A2A2A2',
    // textTransform: 'capitalize',
  },

  nextButtonContainer: {
    width: '94%',
    alignSelf: 'center',
    backgroundColor: '#000000',
    borderRadius: 10,
    height: 45,
    borderColor: '#000',
    borderWidth: 1,
    marginVertical: '4%',
  },
  buttonDisableContainer: {
    width: '94%',
    alignSelf: 'center',
    backgroundColor: '#999999',
    borderRadius: 10,
    height: 45,
    borderColor: '#A2A2A2',
    borderWidth: 1,
    marginVertical: '4%',
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 25,
  },

  termsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginTextStyle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#A2A2A2',
    textAlign: 'center',
    alignSelf: 'center',
    letterSpacing: 0.03,
  },
  loginStyle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
    textDecorationLine: 'underline',
    letterSpacing: 0.03,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  bottomView: {
    bottom: 10,
  },
})

export default styles
