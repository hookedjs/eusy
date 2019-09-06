import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ThemeContext } from '../elements';
import { observer } from 'mobx-react-lite';
import { TextLink } from '../lib/Routing';
import { GlobalState } from '../../GlobalState';
import { ThemeType } from '../../config/Theme.config';

export const FooterEndSection = observer(() => {
  const theme = useContext(ThemeContext).theme as ThemeType;

  return (
    <View style={{ backgroundColor: theme.colors.primaryDarker }}>
      {GlobalState.viewportInfo.isSmall ? (
        <View style={{ paddingVertical: 30, alignItems: 'center' }}>
          <Text style={styles.titleText}>Quick Links</Text>
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
      ) : (
        <View>
          <View
            style={{ paddingVertical: 30, flexDirection: 'row', justifyContent: 'space-evenly' }}
          >
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
        </View>
      )}

      <View
        style={{
          paddingTop: 20,
          paddingBottom: 10,
          alignItems: 'center',
          backgroundColor: theme.colors.primaryDark
        }}
      >
        <Text style={styles.text}>© 2019 Eusy Org</Text>
      </View>
    </View>
  );
});

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
