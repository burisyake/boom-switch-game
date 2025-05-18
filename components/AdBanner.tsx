import { View, Text } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const AD_UNIT_ID = 'ca-app-pub-1713263180391946/1336987579';

export default function AdBanner() {
  return (
    <View style={{ alignItems: 'center' }}>
      {/* <Text>ーーーーーーテストーーーーーー</Text>
      <Text>ーーーーーーテストーーーーーー</Text>
      <Text>ーーーーーーテストーーーーーー</Text> */}
      <BannerAd unitId={AD_UNIT_ID} size={BannerAdSize.FULL_BANNER} />
    </View>
  );
}
