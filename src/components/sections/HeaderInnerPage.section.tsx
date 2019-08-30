import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text, ThemeContext } from 'react-native-elements';
import { observer } from 'mobx-react-lite';
import { Feather } from '@expo/vector-icons';
import { GlobalState } from '../../GlobalState';
import { useRouter } from '../lib/Routing';

export const HeaderInnerPageSection = observer(() => {
  const { history } = useRouter();
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        zIndex: 2,
        backgroundColor: theme.colors.primaryLighter,
        paddingHorizontal: 6,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: GlobalState.viewportInfo.heightStatusBar + 13
      }}
    >
      <View>
        <Feather
          name="chevron-left"
          size={24}
          color="#2D3C56"
          onPress={() => history.goBack()}
          style={{ paddingLeft: 10, paddingRight: 14 }}
        />
      </View>

      <Text>{GlobalState.currentPageTitle}</Text>

      <View style={{ width: 48 }} />
    </View>
  );
});
