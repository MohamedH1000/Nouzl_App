import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useAppContext } from '@/contexts/AppContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TourGuidesScreen() {
  const { t, language } = useAppContext();
  const colorScheme = useColorScheme();
  const isArabic = language === 'ar';

  return (
    <SafeAreaView className="flex-1">
    <ScrollView
      className="flex-1 bg-gray-50"
      contentContainerClassName="p-4"
    >
      {/* Header */}
      <View className="items-center mb-6 pt-5">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          {t('tour_guides')}
        </Text>
        <Text className="text-base text-gray-600 text-center">
          {isArabic ? 'اكتشف أفضل المرشدين السياحيين' : 'Discover the best tour guides'}
        </Text>
      </View>

      {/* Placeholder content */}
      <View className="space-y-4">
        <View className="bg-white rounded-xl p-4 border border-gray-200 flex-row items-center gap-4">
          <Image
            source={require('@/assets/attraction.png')}
            className="w-20 h-20 rounded-lg"
          />
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900 mb-1">
              {isArabic ? 'قيد التطوير' : 'Coming Soon'}
            </Text>
            <Text className="text-sm text-gray-600 leading-5">
              {isArabic
                ? 'سنقوم بإطلاق خدمة المرشدين السياحيين قريباً'
                : 'Tour guide services will be available soon'
              }
            </Text>
          </View>
        </View>

        <View className="bg-white rounded-xl p-4 border border-gray-200 flex-row items-center gap-4">
          <View className="w-20 h-20 rounded-lg bg-primary items-center justify-center">
            <Text className="text-3xl">👥</Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900 mb-1">
              {isArabic ? 'مرشدون محترفون' : 'Professional Guides'}
            </Text>
            <Text className="text-sm text-gray-600 leading-5">
              {isArabic
                ? 'مرشدون معتمدون وذوو خبرة في جميع الوجهات'
                : 'Certified and experienced guides for all destinations'
              }
            </Text>
          </View>
        </View>

        <View className="bg-white rounded-xl p-4 border border-gray-200 flex-row items-center gap-4">
          <View className="w-20 h-20 rounded-lg bg-primary-dark items-center justify-center">
            <Text className="text-3xl">🗣️</Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900 mb-1">
              {isArabic ? 'دعم لغات متعددة' : 'Multi-language Support'}
            </Text>
            <Text className="text-sm text-gray-600 leading-5">
              {isArabic
                ? 'مرشدون يتحدثون العربية والإنجليزية ولغات أخرى'
                : 'Guides speaking Arabic, English and other languages'
              }
            </Text>
          </View>
        </View>

        <View className="bg-white rounded-xl p-4 border border-gray-200 flex-row items-center gap-4">
          <View className="w-20 h-20 rounded-lg bg-primary-light items-center justify-center">
            <Text className="text-3xl">📍</Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900 mb-1">
              {isArabic ? 'معرفة محلية' : 'Local Knowledge'}
            </Text>
            <Text className="text-sm text-gray-600 leading-5">
              {isArabic
                ? 'مرشدون يعرفون كل الأماكن الخفية والتجارب المحلية'
                : 'Guides who know all the hidden spots and local experiences'
              }
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}