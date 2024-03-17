import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, ICONS, FONTS} from '../resources';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.profileImage} source={ICONS.PROFILE_ICON} />
      <View>
        <Text style={styles.descText}>Welcome</Text>
        <Text style={styles.appText}>Samantha Jones</Text>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingVertical: '10%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  appText: {color: COLORS.white, ...FONTS.body3},
  descText: {color: COLORS.white, ...FONTS.body4},
});
