import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    paddingBottom: 5,
    marginTop: 5,
    paddingRight: 3,
    backgroundColor: '#f2f2f2',

  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 10,
    // borderColor: 'rgba(230, 230, 230, .5)',
    // borderWidth: 2,
    elevation: 3,
    // marginBottom: 5,
    backgroundColor: '#f2f2f2',
    // marginTop:5,
    marginLeft: 7,
    overflow: 'hidden',
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'flex-end'
    // marginLeft: 5,
    // marginRight: 5,
    // marginTop:5,
    marginBottom: 5,
    backgroundColor: 'rgba(230, 230, 230, 0.5)',
    // borderRadius: 10,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 2,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 15,
  },
  topLeftContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topLeftUpperContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topLeftBottomContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topRightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    flexDirection: 'row',
    marginTop: 0,
  },
  bottomLeftContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // marginTop:5,
  },
  bottomRightContainer: {
    // flex: 1,
    // // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // // alignItems: 'center',
    flex: 1,
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // flexDirection: 'row',
    // marginTop: 0,
    // alignContent: 'center',
  },
  iconBottomLeftContainer: {
    marginTop: 2,
  },
  topLefttUpperText: {
    fontSize: 17,
    color: '#1B62AB',
    margin: '1%',
    marginLeft: 7,
  },
  commonTextStyle: {
    fontSize: 15,
    color: '#8c8c8c',
    margin: '1%',
  },
  scheduleTextStyle: {
    fontSize: 15,
    color: '#ffb84d',
    margin: '1%',
  },
  deliveredTextStyle: {
    fontSize: 15,
    color: '#5cd65c',
    margin: '1%',
  },
});

export default Styles;
