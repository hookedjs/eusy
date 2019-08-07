import React from 'react';
import { View } from 'react-native';
import { Button, Image, Input, Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { LogoIcon } from '../svgs';
import { Helmet } from '../lib/Helmet';
import { TextLink, useRouter } from '../lib/Routing';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

export const LoginRoute = () => {
  const { history } = useRouter();
  const windowDims = useWindowDimensions();

  return (
    <>
      <Helmet title="Settings" />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            flex: 1,
            maxWidth: 540,
            alignItems: 'center',
            paddingTop: windowDims.isLarge ? 20 : 100,
            paddingBottom: windowDims.isLarge ? 0 : 60,
            paddingHorizontal: 30
          }}
        >
          <LogoIcon width={200} height={200} fill="#2D3C56" style={{ marginBottom: 20 }} />
          <Text h4 style={styles.text}>
            Log In
          </Text>
          <Text style={styles.text}>
            Need a EUSY account? <TextLink to="/register">Create an account</TextLink>
          </Text>
          <Input
            placeholder="Email"
            leftIcon={{ type: 'feather', name: 'mail', color: '#2D3C56' }}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            containerStyle={{
              marginBottom: 18
            }}
            inputContainerStyle={{
              borderWidth: 2,
              borderBottomWidth: 2,
              borderRadius: 44 / 2,
              borderColor: '#2D3C56'
            }}
            leftIconContainerStyle={{
              marginRight: 10
            }}
            // ref={input => (this.password2Input = input)}
            // onSubmitEditing={() => {
            //   this.confirmPassword2Input.focus();
            // }}
          />
          <Input
            placeholder="Password"
            leftIcon={{ type: 'feather', name: 'lock' }}
            autoCapitalize="none"
            secureTextEntry={true}
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            containerStyle={{
              marginBottom: 30
            }}
            inputContainerStyle={{
              borderWidth: 2,
              borderBottomWidth: 2,
              borderRadius: 44 / 2,
              borderColor: '#2D3C56'
            }}
            leftIconContainerStyle={{
              marginRight: 10
            }}
          />
          <Button
            title="Log In"
            // icon={{ type: 'feather', name: 'arrow-right', color: 'white' }}
            // iconRight
            onPress={() => history.push('/register')}
            containerStyle={{
              marginBottom: 30,
              paddingHorizontal: 12,
              width: '100%'
            }}
            buttonStyle={{
              paddingVertical: 10,
              borderRadius: 44 / 2
            }}
          />
          <Text style={styles.text}>
            <TextLink to="/register">Forgot username?</TextLink>
            {' · '}
            <TextLink to="/register">Forgot password?</TextLink>
          </Text>

          {windowDims.isLarge && (
            <Text style={{ ...styles.text, marginTop: 30 }}>
              ©2001–2019 All Rights Reserved. EUSY® is a registered trademark of HookedJS.org.{' '}
              <TextLink to="/register">Cookie Preferences</TextLink>, Privacy, and Terms.
              {', '}
              <TextLink to="/register">Privacy</TextLink>
              {', '}
              <TextLink to="/register">Terms</TextLink>
              {'.'}
            </Text>
          )}
        </View>

        {windowDims.isLarge && (
          <View
            style={{
              flex: 2,
              height: windowDims.unsafeHeight
            }}
          >
            <Image
              source={require('../../assets/img/space.jpg')}
              style={{
                flex: 1,
                resizeMode: 'cover',
                height: windowDims.unsafeHeight
              }}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 24
  }
});
