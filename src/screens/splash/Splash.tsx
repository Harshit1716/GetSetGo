import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, ICONS, SIZES, FONTS} from '../../resources';

const Splash = ({navigation}: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={ICONS.APP_LOGO_ICON}
        style={{height: 70, width: 'auto', marginTop: SIZES.height * 0.4}}
      />
      <View style={styles.textContainer}>
        <Text style={styles.appText}>GET SET GO</Text>
        <Text style={styles.descText}>Fly with Ease</Text>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.primary},
  appText: {color: COLORS.white, ...FONTS.h1, fontWeight: '600'},
  descText: {color: COLORS.lightGray, ...FONTS.body4},
  textContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    bottom: SIZES.height * 0.1,
    position: 'absolute',
  },
});
