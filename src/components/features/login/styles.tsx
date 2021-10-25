import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: '#E5E5E5',
    flexGrow: 1,
    paddingTop: '5%',
    height: '100%',
    marginTop: '5%'
  },
  container: {
    flexGrow: 1,
    marginHorizontal: '5%',
  },
  inputLabel: {
    marginVertical: '1%',
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

  forgotContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    marginRight: '2%',
  },
  forgotTextStyle: {
    fontSize: 14,
    lineHeight: 16,
    color: '#A2A2A2',
    textDecorationLine: 'underline',
  },

  logoStyle: {
    alignSelf: 'center',
    borderWidth: 1,
    padding: '2%',
    borderRadius: 10,
    width: 120,
    height: 90,
  },

  loginContainer: {
    flex: 1,
    marginTop: '2%',
  },

  textStyle: {
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.03,
    color: '#B0B0B0',
    // textTransform: 'capitalize',
  },

  nextButtonContainer: {
    alignSelf: 'center',
    backgroundColor: '#000000',
    borderRadius: 10,
    height: 45,
    borderColor: '#000',
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

  privacyTextStyle: {
    width: 250,
    fontSize: 14,
    lineHeight: 16,
    color: '#A2A2A2',
    textAlign: 'center',
    marginVertical: '3%',
    alignSelf: 'center',
  },

  signupView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '3%',
  },

  signupTextStyle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#A2A2A2',
    textAlign: 'center',
    alignSelf: 'center',
    letterSpacing: 0.03,
  },
  signupStyle: {
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
    bottom: 0,
  },
  snackbarContainer: {
    flex: 1,
    justifyContent: 'space-between',
    bottom: '1%',
  },
  
})

export default styles
