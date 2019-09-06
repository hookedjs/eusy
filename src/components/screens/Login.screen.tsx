import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import qs from 'query-string';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '../elements';
import SpaceImageUrl from '../../assets/img/space.jpg';
import { GlobalState } from '../../GlobalState';
import { MockOrm } from '../../mockApi/MockOrm';
import { Helmet } from '../lib/Helmet';
import { TextLink, useRouter } from '../lib/Routing';
import { LogoModule } from '../modules/Logo.module';
import Markdown from 'react-native-markdown-renderer';

export const LoginScreen = observer(() => {
  const title = 'Log In';
  const { history, location } = useRouter();
  const redirectFromUrl = qs.parse(location.search).redirectTo as string;

  const formStore = useLocalStore(() => ({
    loading: false,
    data: { email: MockOrm.users.db[0].email, password: 'password' },
    serverError: '',
    submit: async () => {
      formStore.loading = true;
      formStore.serverError = '';
      const res = await MockOrm.users.login(formStore.data);

      formStore.loading = false;
      formStore.serverError = res.error;
      if (!res.error) {
        GlobalState.user = {
          id: res.data.id,
          token: res.data.token,
          roles: JSON.parse(res.data.roles)
        };
        history.push(redirectFromUrl || '/home');
      }
    }
  }));

  return (
    <>
      <Helmet title={title} />
      <ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              flex: 1,
              maxWidth: 540,
              alignItems: 'center',
              paddingTop: GlobalState.viewportInfo.isLarge ? 20 : 40,
              paddingBottom: GlobalState.viewportInfo.isLarge ? 0 : 60,
              paddingHorizontal: GlobalState.viewportInfo.isLarge ? 30 : 10
            }}
          >
            <LogoModule width={100} height={100} style={{ marginBottom: 20 }} />
            <Text h4 style={styles.text}>
              Log In
            </Text>
            <Text style={styles.text}>
              Need an EUSY account?{' '}
              <TextLink
                to={{
                  pathname: '/user/register',
                  search: redirectFromUrl && `?redirectTo=${redirectFromUrl}`
                }}
              >
                Create an account
              </TextLink>
            </Text>
            <Input
              placeholder="Email"
              value={formStore.data.email}
              onChangeText={val => (formStore.data.email = val)}
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
              value={formStore.data.password}
              onChangeText={val => (formStore.data.password = val)}
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
              title={formStore.loading ? 'Working...' : 'Log In'}
              onPress={formStore.submit}
              containerStyle={{ width: '100%' }}
            />
            {!!formStore.serverError && (
              <Markdown>
                Please correct the following issue:{'\n'}- {formStore.serverError}
              </Markdown>
            )}

            <Text style={styles.text}>
              <TextLink
                to={{ pathname: '/user/register', search: `?redirectTo=${redirectFromUrl}` }}
              >
                Forgot username?
              </TextLink>
              {' · '}
              <TextLink
                to={{ pathname: '/user/register', search: `?redirectTo=${redirectFromUrl}` }}
              >
                Forgot password?
              </TextLink>
            </Text>

            {GlobalState.viewportInfo.isLarge && (
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

          {GlobalState.viewportInfo.isLarge && (
            <View
              style={{
                flex: GlobalState.viewportInfo.width > 900 ? 2 : 1,
                height: GlobalState.viewportInfo.heightUnsafe
              }}
            >
              <Image
                source={SpaceImageUrl}
                style={{
                  flex: 1,
                  resizeMode: 'cover',
                  height: GlobalState.viewportInfo.heightUnsafe
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
});

const styles = StyleSheet.create({
  text: {
    marginBottom: 24
  }
});
