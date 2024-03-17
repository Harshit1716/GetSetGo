import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, ICONS, FONTS} from '../resources';
import {useNavigation} from '@react-navigation/native';

const ListHeader = (props: any) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image style={styles.profileImage} source={ICONS.BACK_ICON} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.descText}>Search Result</Text>
        <Text style={styles.appText}>
          {props?.origin} To {props?.destination}
        </Text>
      </View>
      <TouchableOpacity>
        {/* <Image
          style={{tintColor: COLORS.white, ...styles.profileImage}}
          source={ICONS.FILTER_ICON}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingVertical: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },
  profileImage: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  appText: {color: COLORS.white, ...FONTS.body3},
  descText: {color: COLORS.white, ...FONTS.body4},
});
