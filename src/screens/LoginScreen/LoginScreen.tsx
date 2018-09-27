import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Input } from '../../components/common';
import _ from 'lodash';
import STRINGS from '../../constants/strings';
import styles from './Styles';

interface Props {
    navigation: any
}

interface State {
    input: {
        email: string,
        password: string
    }
}

class LoginScreen extends Component <Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            input: {
                email: '',
                password: ''
            }
        }
    }

    createAccountPressed = () => {
        const { navigate } = this.props.navigation;
        navigate("CreateAccountScreen");
    };

    onInputChange = (name: string, data: string) => {
        let input = this.state.input;
        _.set(input, name, data);

        this.setState({ input });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    { STRINGS.LOGIN_TITLE }
                </Text>

                <Input title={ STRINGS.EMAIL_ADDRESS }
                       onChangeText={(data: string) => this.onInputChange('email', data)} />
                <Input title={ STRINGS.PASSWORD }
                       onChangeText={(data: string) => this.onInputChange('password', data)}
                       secureTextEntry />

                <Button>
                    { STRINGS.LOGIN }
                </Button>

                <TouchableOpacity onPress={() => this.createAccountPressed()}>
                    <Text style={styles.questionText}>
                        { STRINGS.ACCOUNT_QUESTION }
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default LoginScreen;
