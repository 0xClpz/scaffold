import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  LoginForm,
  GoBack,
} from './../components';

import Colors from '../config/Colors';
import { login as loginAction } from '../actions/authActions';
import styles from './styles/Login';


/* eslint-disable react/prefer-stateless-function */
class Login extends Component {
  static propTypes = {
    loginAction: PropTypes.func,
    auth: PropTypes.object,
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Login',
    headerLeft: <GoBack navigation={navigation} route={null} />,
    headerStyle: {
      backgroundColor: Colors.$green,
    },
    headerTintColor: Colors.$white,
  });

  // Submit the values from the LoginForm through a Redux action
  // We also pass on the navigation prop so we can use it in navigationHelpers
  submitLogin = async (values) => {
    const { navigation } = this.props;
    await this.props.loginAction(navigation, values);
  }

  render() {
    const { auth } = this.props;

    return (
      <View style={styles.root} >
        <LoginForm
          submitLogin={this.submitLogin}
          serverError={auth.error}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

// Connect the screen component to Redux and pass mapped state and actions
export default connect(
  mapStateToProps,
  { loginAction },
)(Login);
