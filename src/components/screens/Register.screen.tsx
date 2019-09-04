import React, { useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import qs from 'query-string';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import SpaceImageUrl from '../../assets/img/space.jpg';
import { GlobalState } from '../../GlobalState';
import { UserSanitizer } from '../../model/users/sanitizer';
import { UserType, UserTypeWritable } from '../../model/users/type';
import { Helmet } from '../lib/Helmet';
import { TextLink, useRouter } from '../lib/Routing';
import { LogoModule } from '../modules/Logo.module';
import Markdown from 'react-native-markdown-renderer';
import { useMutation } from '../../mockApi/hooks/useMutation';
import { gql } from 'apollo-boost';
import { MockOrm } from '../../mockApi/MockOrm';

const USER_CREATE = gql`
  mutation UserCreate($id: String!, $email: String!, $nameGiven: String!, $nameFamily: String!) {
    createUser(
      data: { email: $email, nameGiven: $nameGiven, nameFamily: $nameFamily }
      where: { id: $id }
    ) {
      id
      roles
      email
      avatar
      nameGiven
      nameFamily
    }
  }
`;

export const RegisterScreen = observer(() => {
  const title = 'Register';
  const { history, location } = useRouter();
  const redirectFromUrl = qs.parse(location.search).redirectTo as string;

  const [userCreate, userCreateState] = useMutation(USER_CREATE);

  const formStore = useLocalStore(() => ({
    data: { email: '', password: '', nameGiven: '', nameFamily: '' } as UserType,
    watchErrors: false, // If true, validates continuously
    errors: { email: '', password: '', nameGiven: '', nameFamily: '' },
    validate() {
      [formStore.data, formStore.errors] = UserSanitizer.sanitizer(formStore.data, true) as any;
      return !!Object.values(formStore.errors).length;
    },
    async submit() {
      if (formStore.validate()) {
        formStore.watchErrors = true;
        return;
      }
      const { errors } = await userCreate({
        variables: {
          ...formStore.data,
          roles: JSON.stringify(['identified']),
          handle: `${formStore.data.nameGiven}${formStore.data.nameFamily}`,
          avatar: '',
          recentSearches: JSON.stringify(['welcome'])
        } as UserTypeWritable
      });

      if (errors.length) console.dir(errors);
      else {
        const res = await MockOrm.users.login(formStore.data);
        if (!res.error) {
          GlobalState.user = {
            id: res.data.id,
            token: res.data.token,
            roles: JSON.parse(res.data.roles)
          };
          history.push(redirectFromUrl || '/home');
        } else {
          alert('Unexpected Login Error: ' + res.error);
        }
      }
    }
  }));

  useEffect(() => {
    formStore.validate();
  }, [formStore.data]);

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
              Register
            </Text>
            <Text style={styles.text}>
              Already have an EUSY account? <TextLink to="/register">Log In</TextLink>
            </Text>
            <Input
              placeholder="First Name"
              value={formStore.data.nameGiven}
              onChangeText={val => (formStore.data.nameGiven = val)}
              errorMessage={formStore.watchErrors ? formStore.errors.nameGiven : ''}
              leftIcon={{ type: 'feather', name: 'user', color: '#2D3C56' }}
              // autoCapitalize="none"
              // autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              containerStyle={{
                marginBottom: 18
              }}
              // ref={input => (this.password2Input = input)}
              // onSubmitEditing={() => {
              //   this.confirmPassword2Input.focus();
              // }}
            />
            <Input
              placeholder="Last Name"
              value={formStore.data.nameFamily}
              onChangeText={val => (formStore.data.nameFamily = val)}
              errorMessage={formStore.watchErrors ? formStore.errors.nameFamily : ''}
              leftIcon={{ type: 'feather', name: 'user-plus', color: '#2D3C56' }}
              // autoCapitalize="none"
              // autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              containerStyle={{
                marginBottom: 18
              }}
              // ref={input => (this.password2Input = input)}
              // onSubmitEditing={() => {
              //   this.confirmPassword2Input.focus();
              // }}
            />
            <Input
              placeholder="Email"
              value={formStore.data.email}
              errorMessage={formStore.watchErrors ? formStore.errors.email : ''}
              onChangeText={val => (formStore.data.email = val)}
              leftIcon={{ type: 'feather', name: 'mail', color: '#2D3C56' }}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              containerStyle={{
                marginBottom: 18
              }}
              // ref={input => (this.password2Input = input)}
              // onSubmitEditing={() => {
              //   this.confirmPassword2Input.focus();
              // }}
            />
            <Input
              placeholder="Password"
              value={formStore.data.password}
              onChangeText={val => (formStore.data.password = val)}
              errorMessage={formStore.watchErrors ? formStore.errors.password : ''}
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
              title={userCreateState.loading ? 'Working...' : 'Register'}
              onPress={formStore.submit}
              disabled={userCreateState.loading}
              containerStyle={{ width: '100%' }}
            />
            {(formStore.watchErrors && !!Object.values(formStore.errors).length) ||
              (!!userCreateState.error && !!userCreateState.error.graphQLErrors.length && (
                <Markdown>
                  Please correct the following issues:{'\n'}
                  {formStore.watchErrors && !!Object.values(formStore.errors).length
                    ? '1. ' + Object.values(formStore.errors).join('\n 1. ')
                    : ''}
                  {!!userCreateState.error &&
                    !!userCreateState.error.graphQLErrors.length &&
                    '1. ' + userCreateState.error.graphQLErrors.map(e => e.message).join('\n1. ')}
                </Markdown>
              ))}

            <Text style={styles.text}>
              <TextLink to={{ pathname: '/user/login', search: `?redirectTo=${redirectFromUrl}` }}>
                Forgot username?
              </TextLink>
              {' · '}
              <TextLink to={{ pathname: '/user/login', search: `?redirectTo=${redirectFromUrl}` }}>
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
