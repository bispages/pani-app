import { StyleSheet } from 'react-native';
import Colors from '../../assets/colors';
import { material } from 'react-native-typography';

export default StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    title: {
        ...material.headlineObject,
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
        ...material.subheadingObject,
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
    skipTxt: {
        ...material.body1Object,
        color: Colors.secondary,
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