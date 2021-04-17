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
    text: {
        flex: 0.3,
    },
    dotStyle: {
        backgroundColor: Colors.secondary,
    },
    activeDotStyle: {
        backgroundColor: Colors.dimwhite,
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: Colors.secondary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRounded: {
        width: 50,
        height: 40,
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    }
});