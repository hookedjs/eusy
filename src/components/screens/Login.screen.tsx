import React from 'react';
import { set } from 'mobx';
import { observer } from 'mobx-react-lite';
import qs from 'query-string';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { Helmet } from '../lib/Helmet';
import SpaceImageUrl from '../../assets/img/space.jpg';
import { UserState } from '../../state/User.state';
import { WindowState } from '../../state/Window.state';
import { TextLink, useRouter } from '../lib/Routing';
import { LogoModule } from '../modules/Logo.module';

export const LoginScreen = observer(() => {
  const { location, history } = useRouter();
  const redirectFromUrl = qs.parse(location.search).redirectTo as string;

  const handleSubmit = async () => {
    set(UserState, {
      email: 'marie@antoinette.com',
      nameFirst: 'Marie',
      nameLast: 'Antoinette',
      roles: ['Identified']
    });
    history.push(redirectFromUrl || '/home');
  };

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
            Need a EUSY account?{' '}
            <TextLink to={{ pathname: '/user/register', search: `?redirectTo=${redirectFromUrl}` }}>
              Create an account
            </TextLink>
          </Text>
          <Input
            placeholder="Email"
            value="marie@antoinette.com"
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
            value="password"
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
          <Button title="Log In" onPress={handleSubmit} containerStyle={{ width: '100%' }} />
          <Text style={styles.text}>
            <TextLink to={{ pathname: '/user/register', search: `?redirectTo=${redirectFromUrl}` }}>
              Forgot username?
            </TextLink>
            {' · '}
            <TextLink to={{ pathname: '/user/register', search: `?redirectTo=${redirectFromUrl}` }}>
              Forgot password?
            </TextLink>
          </Text>

          {WindowState.isLarge && (
            <Text style={{ ...styles.text, marginTop: 30 }}>
              ©2019 All Rights Reserved. EUSY® is a registered trademark of HookedJS.org.{' '}
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
              flex: WindowState.width > 900 ? 2 : 1,
              height: WindowState.heightUnsafe
            }}
          >
            <Image
              source={SpaceImageUrl}
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
