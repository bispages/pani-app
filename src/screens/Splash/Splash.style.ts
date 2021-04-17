import { StyleSheet } from 'react-native';
import Colors from '../../assets/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    logoContainer: {
        display: 'flex',
        flex: 0.1,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    splashContainer: {
        display: 'flex',
        flex: 0.9,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});