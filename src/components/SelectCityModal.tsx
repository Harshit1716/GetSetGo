import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import {COLORS, ICONS, FONTS} from '../resources';

const SelectCityModal = ({visible, onClose, title, onSelect}: any) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
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
            <Text style={styles.appText}>Select City</Text>
            <TouchableOpacity
              onPress={() => {
                onClose();
              }}
              style={{marginLeft: '5%'}}>
              <Image
                resizeMode="contain"
                style={{height: 40, width: 40}}
                source={ICONS.CROSS_ICON}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              margin: 20,
              padding: 5,
              borderRadius: 10,
              backgroundColor: COLORS.secondary,
              alignItems: 'center',
            }}>
            <TouchableOpacity style={{marginHorizontal: '5%'}}>
              <Image
                resizeMode="contain"
                style={{height: 20, width: 20}}
                source={ICONS.SEARCH_ICON}
              />
            </TouchableOpacity>
            <TextInput
              style={{flex: 1, ...styles.modalText}}
              value={searchValue}
              onChangeText={(text: string) => setSearchValue(text)}
              placeholderTextColor={COLORS.gray}
              placeholder="Search City"
            />
          </View>
          <FlatList
            contentContainerStyle={{marginHorizontal: '7%'}}
            data={['Delhi', 'Banglore', 'Chennai', ''].filter(item =>
              item.toLowerCase().includes(searchValue.toLowerCase()),
            )}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  setSearchValue('');
                  onClose();
                }}
                style={{
                  marginBottom: '3%',
                  borderColor: COLORS.gray,
                }}>
                <Text style={styles.appText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  appText: {
    color: COLORS.white,
    ...FONTS.h1,
    fontWeight: '600',
    // marginLeft: '20%',
    flex: 1,
  },
  modalContent: {
    backgroundColor: COLORS.primary,
    height: '90%',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    ...FONTS.body3,
    color: COLORS.white,
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectCityModal;
