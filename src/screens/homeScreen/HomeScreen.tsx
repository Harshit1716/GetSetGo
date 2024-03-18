import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, ICONS, SIZES, FONTS} from '../../resources';
import HomeHeader from '../../components/HomeHeader';
import SelectCityModal from '../../components/SelectCityModal';
import DatePicker from 'react-native-date-picker';

const HomeScreen = ({navigation}: any) => {
  const [flightType, setFlightType] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [dateOne, setDateOne] = useState('');
  const [dateTwo, setDateTwo] = useState('');
  const [TravellDate, setTravellDate] = useState(true);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [currentSelected, setCurrentSelected] = useState<
    'origin' | 'destination'
  >('origin');

  const validate = () => {
    if (!origin) {
      Alert.alert('Please select origin');
      return false;
    }
    if (!destination) {
      Alert.alert('Please select destination');
      return false;
    }
    if (origin == destination) {
      Alert.alert("Origin and Destination can't be same");
      return false;
    }
    return true;
  };
  const handleSearchFlight = () => {
    const res = validate();
    if (res) {
      navigation.navigate('FlightList', {origin, destination});
    }
  };
  return (
    <View style={styles.container}>
      <HomeHeader />
      <ScrollView>
        <Text style={styles.appText}>Hi Samantha,</Text>
        <Text style={styles.appText}>Where are you flying to?</Text>
        <View
          style={{
            backgroundColor: COLORS.secondary,
            paddingVertical: '5%',

            borderRadius: 20,
            marginTop: '10%',
          }}>
          <View>
            <View style={{flexDirection: 'row', paddingHorizontal: '7%'}}>
              <View style={{flex: 1}}>
                <Text style={styles.descText}>FROM</Text>
                <TouchableOpacity
                  onPress={() => {
                    setCurrentSelected('origin');
                    setModalVisible(true);
                  }}>
                  <Text
                    style={{
                      ...styles.selectCityTxt,
                      color: origin ? COLORS.white : COLORS.gray,
                    }}>
                    {origin ? origin : 'Select City'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                resizeMode="contain"
                style={styles.profileImage}
                source={ICONS.BOOK_ICON}
              />
              <View style={{flex: 1}}>
                <Text style={{...styles.descText, alignSelf: 'flex-end'}}>
                  TO
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setCurrentSelected('destination');
                    setModalVisible(true);
                  }}>
                  <Text
                    style={{
                      ...styles.selectCityTxt,
                      color: destination ? COLORS.white : COLORS.gray,
                      alignSelf: 'flex-end',
                    }}>
                    {destination ? destination : 'Select City'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                backgroundColor: COLORS.gray,
                width: '100%',
                height: 1,
                marginVertical: '5%',
              }}></View>
          </View>
          <View>
            <View style={{flexDirection: 'row', paddingHorizontal: '7%'}}>
              <View style={{flex: 1}}>
                <Text style={styles.descText}>Travel Date</Text>
                <TouchableOpacity
                  onPress={() => {
                    setTravellDate(true);
                    setDateModalVisible(true);
                  }}>
                  <Text style={styles.selectCityTxt}>
                    {dateOne ? dateOne + '' : 'Select Date'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <Text style={{...styles.descText, alignSelf: 'flex-end'}}>
                  Return Date
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setTravellDate(false);
                    setDateModalVisible(true);
                  }}>
                  <Text
                    style={{alignSelf: 'flex-end', ...styles.selectCityTxt}}>
                    {dateTwo ? dateTwo + '' : 'Select Date'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                backgroundColor: COLORS.gray,
                width: '100%',
                height: 1,
                marginVertical: '5%',
              }}></View>
          </View>
          <View>
            <View style={{flexDirection: 'row', paddingHorizontal: '7%'}}>
              <View style={{flex: 1}}>
                <Text style={styles.descText}>Traveller</Text>
                <Text style={styles.selectCityTxt}>1 Adult</Text>
              </View>
              <View
                style={{
                  height: '100%',
                  backgroundColor: COLORS.white,
                  width: 1,
                }}></View>
              <View style={{flex: 1}}>
                <Text style={{...styles.descText, alignSelf: 'flex-end'}}>
                  Type
                </Text>
                <Text style={{...styles.selectCityTxt, alignSelf: 'flex-end'}}>
                  Economy
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: COLORS.gray,
                width: '100%',
                height: 1,
                marginVertical: '5%',
              }}></View>
            <TouchableOpacity
              onPress={() => setFlightType(!flightType)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '1%',
              }}>
              <Image
                resizeMode="contain"
                style={{marginLeft: '5%', height: 30, width: 30}}
                source={flightType ? ICONS.CHECKED_ICON : ICONS.UNCHECKED_ICON}
              />
              <Text style={{...styles.descText, marginLeft: '2%'}}>
                Show direct flights only
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleSearchFlight}
          style={{
            backgroundColor: COLORS.secondary,
            paddingVertical: '3%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginTop: '10%',
          }}>
          <Text style={styles.appText}>Seach Flight</Text>
        </TouchableOpacity>
      </ScrollView>
      <DatePicker
        modal
        open={dateModalVisible}
        date={new Date()}
        mode="date"
        onConfirm={date => {
          if (TravellDate) {
            setDateOne(date.toLocaleDateString());
          } else {
            setDateTwo(date.toLocaleDateString());
          }
          setDateModalVisible(false);
          // setDate(date)
        }}
        onCancel={() => {
          setDateModalVisible(false);
        }}
      />
      <SelectCityModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        title={'HI'}
        onSelect={(text: string) => {
          if (currentSelected == 'origin') {
            setOrigin(text);
          } else {
            setDestination(text);
          }
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: '5%',
  },
  appText: {color: COLORS.white, ...FONTS.h1, fontWeight: '600'},
  descText: {color: COLORS.lightGray, ...FONTS.body5},
  textContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    bottom: SIZES.height * 0.1,
    position: 'absolute',
  },
  selectCityTxt: {
    color: COLORS.white,
    ...FONTS.h3,
    fontWeight: '600',
    marginTop: 5,
  },
  profileImage: {
    height: 40,
    width: 40,
    alignSelf: 'center',
    flex: 1,
  },
});
