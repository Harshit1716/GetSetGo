import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../resources';
import ListHeader from '../../components/ListHeader';
import URLManager from '../../networkLayer/URLManager';

const FlightListScreen = ({route}: any) => {
  console.log(route?.params);
  const [flightData, setFlightData] = useState<any[]>([]);
  const [filteredFlightData, setFilteredFlightData] = useState<any[]>([]);
  useEffect(() => {
    fetchFlightData();
  }, [route.params]);

  const fetchFlightData = async () => {
    try {
      let urlManager = new URLManager();
      urlManager
        .getFlightData()
        .then(res => {
          return res.json() as Promise<any>;
        })
        .then(res => {
          if (res) {
            let ar = [...res];
            ar = ar.filter(
              item =>
                item.origin == route.params.origin &&
                item.destination == route.params?.destination,
            );
            setFlightData(ar);
            setFilteredFlightData(ar);
          }
        })
        .catch(e => {
          Alert.alert(e.name, e.message);
          return e.response;
        })
        .finally(() => {});
    } catch (error) {
      Alert.alert('Error');
    }
  };

  return (
    <View style={styles.container}>
      <ListHeader
        origin={route.params.origin}
        destination={route.params.destination}
      />
      <FlatList
        contentContainerStyle={{marginVertical: '10%'}}
        data={filteredFlightData}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <View style={{height: 100, width: 1}}></View>
        )}
        renderItem={({item}: any) => (
          <TouchableOpacity
            style={{
              padding: '5%',
              backgroundColor: COLORS.secondary,
              marginBottom: 10,
              borderRadius: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: COLORS.gray, ...FONTS.body5, flex: 1}}>
                {item?.origin}-{item?.destination}
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.body3,
                  alignSelf: 'flex-end',
                }}>
                {item?.flightNumber}-{item?.aircraft}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginTop: 10, flex: 3}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: COLORS.white, ...FONTS.body4}}>
                    Arrival Time:{' '}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.body4,
                      // alignSelf: 'flex-end',
                      marginLeft: 10,
                      fontWeight: '600',
                    }}>
                    {item.arrivalTime.split('T')[1]}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: COLORS.white, ...FONTS.body4}}>
                    Departure Time:{' '}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.body4,
                      // alignSelf: 'flex-end',
                      marginLeft: 10,
                      fontWeight: '600',
                    }}>
                    {item.departureTime.split('T')[1]}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: COLORS.white, ...FONTS.body4}}>
                    Duration :{' '}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.body4,
                      // alignSelf: 'flex-end',
                      marginLeft: 10,
                      fontWeight: '600',
                    }}>
                    {item?.duration}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.descText}>Price</Text>
                <Text style={styles.appText}>{item?.price}/-</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.body3,
                  flex: 1,
                }}>
                {item?.airline}
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.body5,
                }}>
                {item?.seatsAvailable} Seats Avaible
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          position: 'absolute',
          backgroundColor: COLORS.secondary,
          flexDirection: 'row',
          padding: '2%',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: '5%',
          borderRadius: 10,
          alignSelf: 'center',
          borderWidth: 1,
          borderColor: COLORS.gray,
        }}>
        <TouchableOpacity>
          <Text style={styles.descText1}>SORT</Text>
        </TouchableOpacity>
        <View
          style={{
            height: '100%',
            width: 1,
            backgroundColor: COLORS.white,
            marginHorizontal: 10,
          }}></View>
        <TouchableOpacity>
          <Text style={styles.descText1}>FILTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FlightListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: '5%',
  },
  appText: {color: COLORS.white, ...FONTS.h1, fontWeight: '600'},
  descText1: {color: COLORS.lightGray, ...FONTS.body4, fontWeight: '600'},
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
