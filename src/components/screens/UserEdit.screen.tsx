import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar, Button, Input, Text } from 'react-native-elements';
import { Helmet } from '../lib/Helmet';
import { set } from 'mobx';
import { UserState } from '../../state/User.state';
import { WindowState } from '../../state/Window.state';

export const UserEditScreen = () => {
  const title = 'User Edit';
  const [saveButtonText, setSaveButtonText] = useState('Save');

  const handleSubmit = async () => {
    set(UserState, {
      email: 'marie@antoinette.com',
      nameFirst: 'Marie',
      nameLast: 'Antoinette',
      roles: ['Identified']
    });
    // history.push(redirectFromUrl || '/home');
    setSaveButtonText('Saved');
  };

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
            width: WindowState.isLarge ? 400 : WindowState.width
          }}
        >
          <Text h4 style={{ marginBottom: 24, fontWeight: 'bold' }}>
            My Account
          </Text>

          <Avatar
            rounded
            size="xlarge"
            source={{ uri: UserState.avatar }}
            containerStyle={{ marginBottom: 20 }}
          />

          <Input
            placeholder="Email"
            value="marie@antoinette.com"
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
          <Button
            title={saveButtonText}
            onPress={handleSubmit}
            containerStyle={{ width: '100%' }}
          />
        </View>
      </ScrollView>
    </>
  );
};
