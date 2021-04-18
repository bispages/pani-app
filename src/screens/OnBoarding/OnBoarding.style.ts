import { StyleSheet } from 'react-native';
import Colors from '../../assets/colors';

export default StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    title: {
        flex: 0.2,
        textAlignVertical: 'center',
    },
    imageContainer: {
        flex: 0.5,
    },
    image: {
        opacity: 0.8,
        borderRadius: 10,
        overflow: 'hidden',
    },
    text: {
        flex: 0.3,
    },
    dotStyle: {
        backgroundColor: Colors.spotOne,
    },
    activeDotStyle: {
        backgroundColor: Colors.secondary,
    },
    skip: {
        paddingTop: 15,
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: Colors.secondary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greenBtn: {
        backgroundColor: Colors.skipgradientTwo,
    }
});