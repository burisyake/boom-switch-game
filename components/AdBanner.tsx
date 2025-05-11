import { AdMobBanner } from 'expo-ads-admob';
import { View } from 'react-native';

export default function AdBanner() {
  return (
    <View style={{ alignItems: 'center' }}>
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID="ca-app-pub-1713263180391946/1336987579"
        servePersonalizedAds={false}
        onDidFailToReceiveAdWithError={(err) => console.warn('Ad error:', err)}
      />
    </View>
  );
}
