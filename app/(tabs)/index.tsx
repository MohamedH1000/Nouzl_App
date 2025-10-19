import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '@/contexts/AppContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { Database } from '@/types/database';

type Property = Database['public']['Tables']['properties']['Row'] & {
  ratings?: Database['public']['Tables']['ratings']['Row'][];
  address?: Database['public']['Tables']['property_addresses']['Row'];
};

export default function HomeScreen() {
  const { t, language, formatPrice } = useAppContext();
  const colorScheme = useColorScheme();
  const isArabic = language === 'ar';

  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgrounds = [
    require('@/assets/background1.jpg'),
    require('@/assets/background2.jpg'),
    require('@/assets/background3.jpg'),
    require('@/assets/background4.jpg'),
    require('@/assets/background5.png'),
  ];

  // Cycle through backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Fetch properties from Supabase
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select(`
            *,
            ratings:ratings(*),
            address:property_addresses(*)
          `)
          .eq('status', 'Active')
          .limit(8);

        if (error) {
          console.error('Error fetching properties:', error);
          Alert.alert('Error', 'Failed to load properties');
        } else {
          setProperties(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties by type
  const Hotels = properties?.filter(p => p.type === 'Hotel') || [];
  const Apartments = properties?.filter(p => p.type === 'Apartment') || [];
  const Resorts = properties?.filter(p => p.type === 'Resort') || [];
  const Huts = properties?.filter(p => p.type === 'Guesthouse') || [];

  const propertyTypes = [
    {
      type: 'Hotel',
      image: require('@/assets/hotel1.jpg'),
      count: Hotels.length,
      label: t('hotels'),
    },
    {
      type: 'Apartment',
      image: require('@/assets/apartment1.jpg'),
      count: Apartments.length,
      label: t('apartments'),
    },
    {
      type: 'Resort',
      image: require('@/assets/resort1.webp'),
      count: Resorts.length,
      label: t('resorts'),
    },
    {
      type: 'Guesthouse',
      image: require('@/assets/huts.jpg'),
      count: Huts.length,
      label: t('huts'),
    },
  ];

  const PropertyCard = ({ property }: { property: Property }) => (
    <TouchableOpacity className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <Image
        source={
          property.images && property.images.length > 0
            ? { uri: property.images[0] }
            : require('@/assets/background.jpg')
        }
        className="w-full h-32"
        defaultSource={require('@/assets/background.jpg')}
      />
      <View className="p-3">
        <Text className="font-semibold text-gray-900 dark:text-white text-sm mb-1" numberOfLines={1}>
          {property.name}
        </Text>
        <View className="flex-row items-center gap-1 mb-2">
          <Ionicons name="star" size={12} color="#F59E0B" />
          <Text className="text-xs text-gray-600 dark:text-gray-400">
            {property.rating?.toFixed(1) || 'N/A'}
          </Text>
          {property.address?.city && (
            <Text className="text-xs text-gray-500 dark:text-gray-500">
              • {property.address.city}
            </Text>
          )}
        </View>
        <Text className="text-primary font-bold text-sm">
          {formatPrice(property.price, property.currency as any)}
          <Text className="text-xs text-gray-500">/{t('night')}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView className="flex-1 bg-gray-50">
        {/* Hero Section with Background */}
        <View className="relative h-80">
          <Image
            source={backgrounds[backgroundIndex]}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />

          <SafeAreaView className="relative flex-1 justify-center items-center px-6">
            <Text className="text-4xl font-bold text-white mb-2 text-center">
              <Text className="text-primary/80">{t('nuzl')}</Text>
              <Text> {t('search_title')}</Text>
            </Text>
            <Text className="text-primary/60 text-lg text-center">
              {t('search_subtitle')}
            </Text>

            {/* Quick Search Bar */}
            <TouchableOpacity
              className="mt-6 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 flex-row items-center gap-3 w-full max-w-sm"
              onPress={() => Alert.alert(t('search'), 'Navigate to search')}
            >
              <Ionicons name="search" size={20} color="white" />
              <Text className="text-white flex-1">
                {isArabic ? 'ابحث عن وجهتك' : 'Search for your destination'}
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* Content */}
        <View className="px-4 py-6">
          {/* Featured Properties */}
          <View className="mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-2xl font-bold text-gray-900">
                {t('featured_hotels')}
              </Text>
              <TouchableOpacity onPress={() => Alert.alert('View All', 'Navigate to all properties')}>
                <Text className="text-primary font-medium">
                  {isArabic ? 'عرض الكل' : 'View All'}
                </Text>
              </TouchableOpacity>
            </View>

            {isLoading ? (
              <View className="items-center py-8">
                <Text className="text-gray-500 dark:text-gray-400">{t('loading')}</Text>
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-4"
              >
                {properties.slice(0, 4).map((property) => (
                  <View key={property.id} className="w-64">
                    <PropertyCard property={property} />
                  </View>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Property Types */}
          <View className="mb-8">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('property_types')}
            </Text>

            <View className="grid grid-cols-2 gap-4">
              {propertyTypes.map((type) => (
                <TouchableOpacity
                  key={type.type}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                  onPress={() => Alert.alert(type.label, `Show ${type.label} properties`)}
                >
                  <Image
                    source={type.image}
                    className="w-full h-24"
                    resizeMode="cover"
                  />
                  <View className="p-3">
                    <Text className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                      {type.label}
                    </Text>
                    <Text className="text-primary text-xs font-medium">
                      {type.count} {isArabic ? 'عقار' : 'properties'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* CTA Section */}
          <View className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 items-center">
            <Text className="text-xl font-bold text-white mb-2 text-center">
              {isArabic ? 'هل أنت مستعد لحجز إقامتك التالية؟' : 'Ready to book your next stay?'}
            </Text>
            <Text className="text-primary/20 text-sm mb-4 text-center">
              {isArabic
                ? 'ابحث عن عقارك بنزل.. الراحة التي تستحقها… بالسعر الذي تريده'
                : 'Find your perfect property with Nuzl... Comfort you deserve at the price you want'
              }
            </Text>
            <TouchableOpacity
              className="bg-white py-2 px-6 rounded-full"
              onPress={() => Alert.alert('Browse Properties', 'Navigate to all properties')}
            >
              <Text className="text-primary font-semibold">
                {isArabic ? 'تصفح العقارات' : 'Browse Properties'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}