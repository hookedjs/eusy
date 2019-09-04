import React, { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { updatedDiff } from 'deep-object-diff';
import { observer, useLocalStore } from 'mobx-react-lite';
import Markdown from 'react-native-markdown-renderer';
import { ScrollView, View } from 'react-native';
import { Avatar, Button, Input, Text } from 'react-native-elements';
import { Helmet } from '../lib/Helmet';
import { GlobalState } from '../../GlobalState';
import { UserType } from '../../model/users/type';
import { gql } from 'apollo-boost';
import { useQuery } from '../../mockApi/hooks/useQuery';
import { useMutation } from '../../mockApi/hooks/useMutation';
import { UserSanitizer } from '../../model/users/sanitizer';
import { TouchableOpacity } from 'react-native-gesture-handler';

const USER = gql`
  query($id: String!) {
    user(where: { id: $id }) {
      id
      roles
      email
      avatar
      nameGiven
      nameFamily
    }
  }
`;

const USER_UPDATE_PROFILE = gql`
  mutation UserUpdateProfile(
    $id: String!
    $email: String!
    $nameGiven: String!
    $nameFamily: String!
  ) {
    updateUser(
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

export const UserEditScreen = observer(() => {
  const title = 'User Edit';
  const userQuery = useQuery<UserType>(USER, { variables: { id: GlobalState.user.id } });
  const [userUpdateProfile, userUpdateProfileState] = useMutation(USER_UPDATE_PROFILE);

  const formStore = useLocalStore(() => ({
    orig: { avatar: '', email: '', nameGiven: '', nameFamily: '' },
    next: { avatar: '', email: '', nameGiven: '', nameFamily: '' },
    watchErrors: false, // If true, validates continuously
    errors: { avatar: '', email: '', nameGiven: '', nameFamily: '' },
    submitButtonText: 'Loading...',
    loading: true,
    validate() {
      [formStore.next, formStore.errors] = UserSanitizer.sanitizer(formStore.next, true) as any;
      return !!Object.values(formStore.errors).length;
    },
    async submit() {
      if (formStore.validate()) {
        formStore.watchErrors = true;
        return;
      }
      formStore.submitButtonText = 'Working...';
      const { errors } = await userUpdateProfile({
        variables: {
          ...updatedDiff(formStore.orig, formStore.next),
          id: GlobalState.user.id
        }
      });
      if (errors.length) console.dir(errors);
      else formStore.orig = formStore.next;
      formStore.submitButtonText = 'Saved.';
      setTimeout(() => (formStore.submitButtonText = 'Save'), 2000);
    }
  }));

  useEffect(() => {
    if (formStore.watchErrors) formStore.validate();
  }, [formStore.next]);

  useEffect(() => {
    if (!Object.keys(userQuery.data).length) return;
    let next = {
      avatar: userQuery.data.avatar,
      email: userQuery.data.email,
      nameGiven: userQuery.data.nameGiven,
      nameFamily: userQuery.data.nameFamily
    };
    formStore.orig = next;
    formStore.next = next;
    formStore.submitButtonText = 'Save';
    formStore.loading = false;
  }, [userQuery.data]);

  if (userQuery.error.message || userQuery.error.graphQLErrors.length) {
    console.dir(userQuery.error);
    return <></>;
  }
  if (formStore.loading) return <></>;

  return (
    <>
      <Helmet title={title} />
      <ScrollView>
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            paddingVertical: 60,
            paddingHorizontal: 10,
            width: GlobalState.viewportInfo.isLarge ? 400 : GlobalState.viewportInfo.width
          }}
        >
          <Text h4 style={{ marginBottom: 24, fontWeight: 'bold' }}>
            My Account
          </Text>

          <TouchableOpacity onPress={e => {}}>
            <View>
              <Avatar
                rounded
                title={
                  (!formStore.next.avatar &&
                    formStore.next.nameGiven &&
                    formStore.next.nameGiven.slice(0, 1) + formStore.next.nameFamily &&
                    formStore.next.nameFamily.slice(0, 1)) ||
                  ''
                }
                size="xlarge"
                source={{ uri: formStore.next.avatar }}
                containerStyle={{ marginBottom: 20 }}
              />
              <Feather
                name="edit-2"
                size={29}
                color="white"
                style={{
                  backgroundColor: '#aaa',
                  // borderRadius: 4,
                  width: 29,
                  height: 30,
                  position: 'relative',
                  top: -52,
                  left: 120,
                  marginBottom: -30
                }}
              />
            </View>
          </TouchableOpacity>

          <Input
            placeholder="Email"
            value={formStore.next.email}
            onChangeText={val => (formStore.next.email = val)}
            errorMessage={formStore.watchErrors ? formStore.errors.email : ''}
            leftIcon={{ type: 'feather', name: 'mail', color: '#2D3C56' }}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            containerStyle={{
              marginBottom: 18
            }}
            // ref={input => (this.password2Input = input)}
            onSubmitEditing={() => {
              // this.confirmPassword2Input.focus();
            }}
          />

          <Input
            placeholder="First Name"
            value={formStore.next.nameGiven}
            onChangeText={val => (formStore.next.nameGiven = val)}
            errorMessage={formStore.watchErrors ? formStore.errors.nameGiven : ''}
            leftIcon={{ type: 'feather', name: 'mail', color: '#2D3C56' }}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            containerStyle={{
              marginBottom: 18
            }}
            // ref={input => (this.password2Input = input)}
            onSubmitEditing={() => {
              // this.confirmPassword2Input.focus();
            }}
          />

          <Input
            placeholder="Last Name"
            value={formStore.next.nameFamily}
            onChangeText={val => (formStore.next.nameFamily = val)}
            errorMessage={formStore.watchErrors ? formStore.errors.nameFamily : ''}
            leftIcon={{ type: 'feather', name: 'mail', color: '#2D3C56' }}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            containerStyle={{
              marginBottom: 18
            }}
            // ref={input => (this.password2Input = input)}
            onSubmitEditing={() => {
              // this.confirmPassword2Input.focus();
            }}
          />

          <Button
            title={formStore.submitButtonText}
            disabled={formStore.submitButtonText !== 'Save'}
            onPress={formStore.submit}
            containerStyle={{ width: '100%' }}
          />
          {(formStore.watchErrors && !!Object.values(formStore.errors).length) ||
            (!!userUpdateProfileState.error &&
              !!userUpdateProfileState.error.graphQLErrors.length && (
                <Markdown>
                  Please correct the following issues:{'\n'}
                  {formStore.watchErrors && !!Object.values(formStore.errors).length
                    ? '1. ' + Object.values(formStore.errors).join('\n 1. ')
                    : ''}
                  {!!userUpdateProfileState.error &&
                    !!userUpdateProfileState.error.graphQLErrors.length &&
                    '1. ' +
                      userUpdateProfileState.error.graphQLErrors.map(e => e.message).join('\n1. ')}
                </Markdown>
              ))}
        </View>
      </ScrollView>
    </>
  );
});
