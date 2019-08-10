import React from 'react';
import { View } from 'react-native';
import { Button, Image, Input, Text } from 'react-native-elements';
import { observer } from 'mobx-react-lite';
import { StyleSheet } from 'react-native';
import { Helmet } from '../lib/Helmet';
import { TextLink, useRouter } from '../lib/Routing';
import { WindowState } from '../../state/Window.state';
import { LogoModule } from '../modules/Logo.module';

export const LoginRoute = observer(() => {
  const { history } = useRouter();

  return (
    <>
      <Helmet title="Settings" />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            flex: 1,
            maxWidth: 540,
            alignItems: 'center',
            paddingTop: WindowState.isLarge ? 20 : 40,
            paddingBottom: WindowState.isLarge ? 0 : 60,
            paddingHorizontal: 30
          }}
        >
          <LogoModule width={100} height={100} style={{ marginBottom: 20 }} />
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
          />
          <Button
            title="Log In"
            // icon={{ type: 'feather', name: 'arrow-right', color: 'white' }}
            // iconRight
            onPress={() => history.push('/register')}
            containerStyle={{ width: '100%' }}
          />
          <Text style={styles.text}>
            <TextLink to="/register">Forgot username?</TextLink>
            {' · '}
            <TextLink to="/register">Forgot password?</TextLink>
          </Text>

          {WindowState.isLarge && (
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

        {WindowState.isLarge && (
          <View
            style={{
              flex: 2,
              height: WindowState.heightUnsafe
            }}
          >
            <Image
              source={require('../../assets/img/space.jpg')}
              style={{
                flex: 1,
                resizeMode: 'cover',
                height: WindowState.heightUnsafe
              }}
            />
          </View>
        )}
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  text: {
    marginBottom: 24
  }
});
