import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { TextLink } from '../lib/Routing';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

export const FooterEndSection = () => {
  const windowDims = useWindowDimensions();

  return windowDims.isSmall ? (
    <></>
  ) : (
    <View style={{ flex: 1, backgroundColor: '#171E2C' }}>
      <View>
        <View style={{ paddingVertical: 30, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <View>
            <Text style={styles.titleText}>Who</Text>
            <Text style={styles.text}>
              <TextLink style={{ color: 'white' }} to="/">
                The Plains
              </TextLink>
            </Text>
            <Text style={styles.text}>
              <TextLink style={{ color: 'white' }} to="/">
                In Spain
              </TextLink>
            </Text>
            <Text style={styles.text}>
              <TextLink style={{ color: 'white' }} to="/">
                Look exceptional
              </TextLink>
            </Text>
            <Text style={styles.text}>
              <TextLink style={{ color: 'white' }} to="/">
                This time of year
              </TextLink>
            </Text>
          </View>
          <View>
            <Text style={styles.titleText}>What</Text>
            <Text style={styles.text}>
              <TextLink style={{ color: 'white' }} to="/">
                The Plains
              </TextLink>
            </Text>
            <Text style={styles.text}>
              <TextLink style={{ color: 'white' }} to="/">
                In Spain
              </TextLink>
            </Text>
            <Text style={styles.text}>
              <TextLink style={{ color: 'white' }} to="/">
                Look exceptional
              </TextLink>
            </Text>
            <Text style={styles.text}>
              <TextLink style={{ color: 'white' }} to="/">
                This time of year
              </TextLink>
            </Text>
          </View>
          <View>
            <Text style={styles.titleText}>Where</Text>
            <Text style={styles.text}>
              <TextLink style={{ color: 'white' }} to="/">
                The Plains
              </TextLink>
            </Text>
            <Text style={styles.text}>
              <TextLink style={{ color: 'white' }} to="/">
                In Spain
              </TextLink>
            </Text>
            <Text style={styles.text}>
              <TextLink style={{ color: 'white' }} to="/">
                Look exceptional
              </TextLink>
            </Text>
            <Text style={styles.text}>
              <TextLink style={{ color: 'white' }} to="/">
                This time of year
              </TextLink>
            </Text>
          </View>
          <View>
            <Text style={styles.titleText}>When</Text>
            <Text style={styles.text}>
              <TextLink style={{ color: 'white' }} to="/">
                The Plains
              </TextLink>
            </Text>
            <Text style={styles.text}>
              <TextLink style={{ color: 'white' }} to="/">
                In Spain
              </TextLink>
            </Text>
            <Text style={styles.text}>
              <TextLink style={{ color: 'white' }} to="/">
                Look exceptional
              </TextLink>
            </Text>
            <Text style={styles.text}>
              <TextLink style={{ color: 'white' }} to="/">
                This time of year
              </TextLink>
            </Text>
          </View>
        </View>

        <View style={{ paddingVertical: 10, alignItems: 'center' }}>
          <Text style={styles.text}>© 2019 Acme Corp</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    marginBottom: 10
  },
  titleText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10
  },
  buttonTitle: {
    color: 'white'
  }
});
