/**
 * @providesModule ReduxField
 */

import React, {Component} from 'react';
import { TextInput, View, Text, StyleSheet} from 'react-native';
import {Field} from 'redux-form';

class ReduxFieldComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { refField, inputType, keyboardType, multiline, numberOfLines, autoCapitalize, placeholder, secureTextEntry, returnKeyType,containerStyle,
            onSubmitEditing, editable, onChangeText, input: { value, ...restInput}, errorStyle, meta: { touched, error, warning },
            leftIcon, rightIcon, inputStyle, placeholderTextColor} = this.props;

        const textInputComponent = (
            <TextInput
                ref={refField}
                value={value}
                style={[styles.textInputStyle, inputStyle] }
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                placeholder={placeholder}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                underlineColorAndroid={'transparent'}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                editable={editable}
                multiline={multiline}
                numberOfLines={numberOfLines}
                placeholderTextColor={placeholderTextColor}
                { ...restInput }
            />
        );

        const errorComponent = (
            <View>{touched && ((error && <Text style={[styles.errorText]}>{error}</Text>) || (warning && <Text>{warning}</Text>))}</View>
        );

        switch (inputType) {
            case 'image' :
                return(
                    <View></View>
                );
            default:
                return (
                    <View>
                        <View style={[styles.inputContainer, containerStyle]}>
                            {leftIcon && leftIcon()}
                            {textInputComponent}
                            {rightIcon && rightIcon()}
                        </View>
                        <View style={styles.errorView}>
                            {errorComponent}
                        </View>
                    </View>
                )
        }
    }
}

class InputField extends Component {
    render() {
        return (
            <Field
                {...this.props}
                component={ReduxFieldComponent}
                withRef
            />
        )
    }
}
export default InputField;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        minHeight:44,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5,
        fontSize: 18,
        backgroundColor: "white",
        paddingHorizontal:12,
        shadowColor: "black",
        shadowOpacity:0.1,
        elevation:2,
        shadowOffset:{
            height:0,
            width:0
        },
    },
    textInputStyle: {
        flex:1,
    },
    errorView: {
        marginHorizontal: 30
    },
    errorText:{
        color: "red",
        fontSize: 12
    }
});
