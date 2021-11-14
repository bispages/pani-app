import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingContainer: {
    flex: 0.1,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: '400',
  },
  itemsContainer: {
    flex: 0.9,
    width: '100%',
  },
  listContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '3%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  block: {
    width: '32%',
    height: 100,
    margin: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  panelButtonContainer: {
    width: '100%',
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  panelButtonView: {
    width: '90%',
    marginTop: 5,
    flex: 0.3,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  panelButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemBotSheetContainer: {
    width: '100%',
    padding: '3%',
  },
  itemBotSheetHeader: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  itemBotSheetContent: {
    flex: 0.8,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  materialSpec: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  addMinusBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 4,
  },
  alignMiddle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    paddingLeft: '15%',
  },
  panelTextContainer: {
    flex: 0.7,
    width: '100%',
  },
  textContainer: {
    width: '100%',
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preText: {
    paddingHorizontal: 8,
    marginRight: 8,
  },
  textInput: {
    width: '90%',
    marginTop: 5,
    height: 60,
  },
});

export default styles;
