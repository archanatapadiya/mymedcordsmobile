import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    height: '100%',
    marginTop: '5%',

    flex: 1,
  },
  container: {
    flexGrow: 1,
    marginHorizontal: '5%',
  },
  inputLabel: {
    marginVertical: '1%',
    height: 40,
    width: 200,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#999999',
    padding: 10,
    marginLeft: '2%',
    marginRight: '2%',
  },
  inputLabelPass: {
    flex: 1,
    marginVertical: '1%',
    height: 40,
    width: 200,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#999999',
    padding: 10,
    marginLeft: '2%',
    marginRight: '2%',
  },
  inputLabel1: {
    alignContent: 'center',
    alignSelf: 'center',
    marginVertical: '1%',
    height: 40,
    width: 200,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#999999',
    padding: 10,
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
    marginRight: '18%',
    marginTop: '4%',
  },
  forgotTextStyle: {
    fontSize: 14,
    lineHeight: 16,
    color: '#D3ECF9',
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

  nextButtonContainer1: {
    alignSelf: 'center',
    backgroundColor: '#85CFF5',
    borderRadius: 10,
    height: 45,
    borderColor: '#85CFF5',
    borderWidth: 1,
    marginVertical: '4%',
  },
  nextButtonContainer2: {
    alignSelf: 'flex-start',
    backgroundColor: '#85CFF5',
    borderRadius: 10,
    height: 38,
    borderColor: '#85CFF5',
    borderWidth: 1,
    marginVertical: '3%',
  },
  nextButtonText1: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 25,
  },
  nextButtonText2: {
    textAlign: 'left',
    fontSize: 14,
    color: 'white',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 15,
  },

  privacyTextStyle: {
    width: 250,
    fontSize: 14,
    // lineHeight: 16,
    color: '#D3ECF9',
    textAlign: 'center',
    marginVertical: '24%',
    alignSelf: 'center',
  },

  headingTextStyle: {
    fontSize: 26,
    color: '#D3ECF9',
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },

  secondaryTextStyle: {
    width: 250,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D3ECF9',
    textAlign: 'center',
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
});

export default styles;
