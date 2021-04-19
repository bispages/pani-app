import { StyleSheet } from 'react-native';
import Colors from '../../assets/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
    },
    logoContainer: {
        position: 'absolute',
        zIndex: 2,
        margin: 'auto',
    },
    splashContainer: {
        display: 'flex',
        flex: 1,
        zIndex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});