import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {accessibilityInfo} from '../assets/dummyData';
import RatingStars from '../components/RatingStars';
import DetailTabView from '../components/detailTabView/DetailTabView';
import {getDetail} from '../apis/placeApi';

const certConfig = {
  kto: {
    label: '관광공사 인증 무장애 관광지입니다.',
    backgroundColor: '#ffe0e0',
  },
  hodeum: {
    label: 'hodeum 인증 관광지입니다.',
    backgroundColor: '#ccbfff',
  },
};
const StoreOverview = ({storeInfo}) => {
  const [openHoursMore, setOpenHoursMore] = useState(false);
  const handleToggle = () => {
    setOpenHoursMore(prev => !prev);
  };
  return (
    <View style={[styles.section, {gap: 4}]}>
      <View style={{flexDirection: 'row', alignItems: 'baseline', gap: 6}}>
        <Text style={styles.title}>{storeInfo?.displayName?.text}</Text>
        <Text>{storeInfo?.primaryTypeDisplayName?.text}</Text>
      </View>
      <TouchableOpacity onPress={handleToggle} style={{flexDirection: 'row'}}>
        <Text>
          {storeInfo?.regularOpeningHours?.openNow ? '영업중' : '영업종료'}
        </Text>
        <Text>{storeInfo?.hours}</Text>
      </TouchableOpacity>
      {openHoursMore && (
        <View>
          {storeInfo?.regularOpeningHours?.weekdayDescriptions.map(
            (description, index) => (
              <Text key={index}>{description}</Text>
            ),
          )}
        </View>
      )}
      <Text>{storeInfo?.formattedAddress}</Text>
      <View style={{flexDirection: 'row'}}>
        <RatingStars rating={storeInfo?.rating} />
        <Text>{storeInfo?.rating} </Text>
        <Text>({storeInfo?.userRatingCount})</Text>
      </View>
    </View>
  );
};
const DetailPage = ({route}) => {
  const {placeId} = route.params;
  const [loading, setLoading] = useState(true);
  const [storeInfo, setStoreInfo] = useState([]);
  const [reviewInfo, setReciewInfo] = useState([]);
  const certInfo = certConfig[storeInfo?.certification] || null;
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getDetail(placeId);
        setStoreInfo(res.data?.placeDetail);
        setReciewInfo(res.data?.reviewSummary);
      } catch (error) {
        console.error('상세 정보 가져오기 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [placeId]);

  const handleCallPress = () => {
    if (storeInfo.tel !== '' && storeInfo.nationalPhoneNumber.length > 0) {
      if (Platform.OS === 'android') {
        Linking.openURL(`tel:${storeInfo.nationalPhoneNumber}`);
      } else {
        Linking.openURL(`tel://${storeInfo.nationalPhoneNumber}`);
      }
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>로딩..(디자인 추후 구현)</Text>
      </View>
    );
  } else {
    return (
      <View>
        <ScrollView contentContainerStyle={{paddingBottom: 200}}>
          <View style={styles.container}>
            {storeInfo?.certification && (
              <View
                style={[
                  styles.certBanner,
                  {backgroundColor: certInfo?.backgroundColor},
                ]}>
                <Text>{certInfo?.label}</Text>
              </View>
            )}

            <Image
              style={styles.img}
              source={{uri: storeInfo?.image}}
              resizeMode="cover"
            />
            <StoreOverview storeInfo={storeInfo} />

            <View style={{height: '100%', paddingBottom: 180}}>
              <DetailTabView
                reviewInfo={reviewInfo}
                accessibilityInfo={{
                  baseInfo: accessibilityInfo,
                  options: storeInfo.accessibilityOptions,
                }}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomBtnContainer}>
          <TouchableOpacity style={styles.mapBtn}>
            <Text style={styles.bottomBtnText}>구글맵</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.callBtn} onPress={handleCallPress}>
            <Text style={styles.bottomBtnText}>전화 문의하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default DetailPage;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  section: {
    backgroundColor: 'lightgrey',
    padding: 20,
  },
  certBanner: {
    padding: 20,
    alignItems: 'center',
  },
  img: {
    height: 200,
    backgroundColor: 'grey',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  bottomBtnContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    flexDirection: 'row',
    gap: 10,
  },
  callBtn: {
    backgroundColor: 'black',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  mapBtn: {
    backgroundColor: 'black',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    aspectRatio: 1.5,
  },
  bottomBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
