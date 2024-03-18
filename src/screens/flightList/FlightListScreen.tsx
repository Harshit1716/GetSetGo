import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, ICONS, SIZES} from '../../resources';
import ListHeader from '../../components/ListHeader';
import URLManager from '../../networkLayer/URLManager';

const FlightListScreen = ({route}: any) => {
  const [flightData, setFlightData] = useState<any[]>([]);
  const [filteredFlightData, setFilteredFlightData] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allAirlines, setAllAirLines] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [sortType, setSortType] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const applyFiltersAndSort = () => {
    let filteredData = [...flightData];

    if (sortType) {
      filteredData = filteredData.sort((a, b) => a.price - b.price);
    }
    // Apply filters
    if (selectedAirlines.length > 0) {
      filteredData = filteredData.filter(item =>
        selectedAirlines.includes(item.airline),
      );
    }

    setFilteredFlightData(filteredData);
    setIsModalVisible(false);
  };
  const handleClearFilter = () => {
    setFilteredFlightData(flightData);
    setSortType(false);
    setSelectedAirlines([]);
    setIsModalVisible(false);
  };
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
            let airLineArray: string[] | any[] = [];
            let ar = [...res];
            ar = ar.filter(
              item =>
                item.origin == route.params.origin &&
                item.destination == route.params?.destination,
            );
            ar.map(item => {
              if (!airLineArray.includes(item.airline)) {
                airLineArray.push(item.airline);
              }
            });
            console.log(airLineArray);
            setAllAirLines(airLineArray);
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
        <TouchableOpacity onPress={toggleModal} style={{flexDirection: 'row'}}>
          <Text style={styles.descText1}>SORT</Text>
          <View
            style={{
              height: 25,
              width: 1,
              backgroundColor: COLORS.white,
              marginHorizontal: 10,
            }}></View>

          <Text style={styles.descText1}>FILTER</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                width: '100%',
                borderBottomWidth: 1,
                borderColor: COLORS.lightGray,
                paddingHorizontal: '5%',
                paddingVertical: '2%',
                flexDirection: 'row',
              }}>
              <Text style={styles.appText}>Filter Data</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                }}
                style={{marginLeft: '5%'}}>
                <Image
                  resizeMode="contain"
                  style={{height: 40, width: 40}}
                  source={ICONS.CROSS_ICON}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                setSortType(!sortType);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: '2%',
              }}>
              <Image
                resizeMode="contain"
                style={{marginLeft: '5%', height: 30, width: 30}}
                source={sortType ? ICONS.CHECKED_ICON : ICONS.UNCHECKED_ICON}
              />
              <Text style={{...styles.appText, marginLeft: '2%'}}>
                Sort by Price
              </Text>
            </TouchableOpacity>
            <FlatList
              ListHeaderComponent={() => (
                <Text style={{marginLeft: '5%', ...styles.appText}}>
                  Filter by Airlines
                </Text>
              )}
              data={[...allAirlines]}
              renderItem={({item}: any) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      let ar = [...selectedAirlines];
                      if (selectedAirlines.includes(item)) {
                        ar = ar.filter(element => element != item);
                      } else {
                        ar.push(item);
                      }
                      setSelectedAirlines(ar);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: '2%',
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{marginLeft: '5%', height: 30, width: 30}}
                      source={
                        selectedAirlines.includes(item)
                          ? ICONS.CHECKED_ICON
                          : ICONS.UNCHECKED_ICON
                      }
                    />
                    <Text style={{...styles.appText, marginLeft: '2%'}}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}></FlatList>
            <View
              style={{
                width: '60%',
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
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={applyFiltersAndSort}>
                <Text style={styles.appText}>Apply</Text>
              </TouchableOpacity>
              <View
                style={{
                  height: '100%',
                  width: 1,
                  backgroundColor: COLORS.white,
                  marginHorizontal: 10,
                }}></View>
              <TouchableOpacity
                onPress={handleClearFilter}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.appText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  appText: {color: COLORS.white, ...FONTS.h1, fontWeight: '600', flex: 1},
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.primary,
    height: '80%',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    borderRadius: 10,
  },
});
