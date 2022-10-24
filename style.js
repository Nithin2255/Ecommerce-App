import { StyleSheet, View, Text, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end', 
        backgroundColor: '#333333',
    },
    button: {
        backgroundColor: 'rgb(68,214,44)',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#44d62c'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#rgb(0,0,0)',
        letterSpacing: 0.5,
        textTransform: "uppercase",
    },
    bottomContainer: {
        justifyContent: 'center',
        height: height/3,
    },
    textInput: {
        height: 50,
        borderWidth: 1,
        borderColor: 'rgb(68,214,44)',
        marginHorizontal: 20,
        marginVertical:10,
        borderRadius: 25,
        paddingLeft: 10,
    },
    formButton: {
        backgroundColor: 'rgb(68,214,44)',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'black',
        shadowColor: 'white',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation:5,
    },
    formInputContainer: {
        marginBottom: 70,
        ...StyleSheet.absoluteFill,
        zIndex: -1,
        justifyContent: 'center',
    },
    closeButtonContainer: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: 'black',
        shadowColor: 'white',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 5,
        backgroundColor: '#44d62c',
        alignItems: 'center',
        borderRadius: 20,
        top: -20
    },

    labelText: {
        marginBottom: 5,
        fontSize: 16,
        marginLeft: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 15,
        fontSize: 15,
    },
    inputWithLabel: {
        marginBottom: 10,
        marginTop: 5,
    },
})

const toastConfig = {
    warning: ({ text1, props }) => (
        <View style = {{ height: 30, width: '100%', backgroundColor: 'orange', padding: 4, }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
        </View>
    ),
    done: ({ text1, props }) => (
        <View style = {{ height: 30, width: '100%', backgroundColor: '#1affc6', padding: 4, }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
        </View>
    )
}

export { styles, toastConfig }
