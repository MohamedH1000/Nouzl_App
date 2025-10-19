import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAppContext } from '@/contexts/AppContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const { t, language } = useAppContext();
  const colorScheme = useColorScheme();
  const isArabic = language === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const propertyTypes = [
    { id: 'all', name: isArabic ? 'الكل' : 'All', icon: 'grid' },
    { id: 'Hotel', name: t('hotels'), icon: 'business' },
    { id: 'Apartment', name: t('apartments'), icon: 'home' },
    { id: 'Resort', name: t('resorts'), icon: 'beach' },
    { id: 'Guesthouse', name: t('huts'), icon: 'cabin' },
  ];

  const handleSearch = () => {
    Alert.alert(
      t('search'),
      isArabic
        ? 'البحث عن: ' + searchQuery + ', النوع: ' + selectedType
        : 'Searching for: ' + searchQuery + ', Type: ' + selectedType
    );
  };

  return (
    <SafeAreaView  className='flex-1'>
    <ScrollView
      className="flex-1 bg-gray-50"
      contentContainerClassName="p-4"
    >
      {/* Header */}
      <View className="mb-6 pt-5">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          {t('search')}
        </Text>
        <Text className="text-base text-gray-600">
          {t('search_subtitle')}
        </Text>
      </View>

      {/* Search Input */}
      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 mb-2">
          {t('where_to')}
        </Text>
        <View className="relative">
          <Ionicons
            name="search"
            size={20}
            color="#9CA3AF"
            className="absolute left-3 top-3 z-10"
          />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={isArabic ? 'المدينة أو الفندق' : 'City or hotel name'}
            placeholderTextColor="#9CA3AF"
            className={`w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 ${isArabic ? 'text-right' : 'text-left'}`}
          />
        </View>
      </View>

      {/* Property Type Filter */}
      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 mb-3">
          {t('property_types')}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="flex-row gap-2"
        >
          {propertyTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              onPress={() => setSelectedType(type.id)}
              className={`px-4 py-2 rounded-full flex-row items-center gap-2 ${
                selectedType === type.id
                  ? 'bg-primary'
                  : 'bg-white border border-gray-300'
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedType === type.id
                    ? 'text-white'
                    : 'text-gray-700'
                }`}
              >
                {type.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Guests Section */}
      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 mb-3">
          {t('guests')}
        </Text>
        <View className="bg-white rounded-lg p-4 border border-gray-300">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-gray-900 font-medium">
              {isArabic ? 'البالغون' : 'Adults'}
            </Text>
            <View className="flex-row items-center gap-3">
              <TouchableOpacity
                onPress={() => setGuests(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center"
              >
                <Text className="text-primary font-medium">-</Text>
              </TouchableOpacity>
              <Text className="text-gray-900 font-medium w-6 text-center">
                {guests.adults}
              </Text>
              <TouchableOpacity
                onPress={() => setGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}
                className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center"
              >
                <Text className="text-primary font-medium">+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-gray-900 font-medium">
              {isArabic ? 'الأطفال' : 'Children'}
            </Text>
            <View className="flex-row items-center gap-3">
              <TouchableOpacity
                onPress={() => setGuests(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center"
              >
                <Text className="text-primary font-medium">-</Text>
              </TouchableOpacity>
              <Text className="text-gray-900 font-medium w-6 text-center">
                {guests.children}
              </Text>
              <TouchableOpacity
                onPress={() => setGuests(prev => ({ ...prev, children: prev.children + 1 }))}
                className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center"
              >
                <Text className="text-primary font-medium">+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-gray-900 font-medium">
              {isArabic ? 'الغرف' : 'Rooms'}
            </Text>
            <View className="flex-row items-center gap-3">
              <TouchableOpacity
                onPress={() => setGuests(prev => ({ ...prev, rooms: Math.max(1, prev.rooms - 1) }))}
                className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center"
              >
                <Text className="text-primary font-medium">-</Text>
              </TouchableOpacity>
              <Text className="text-gray-900 font-medium w-6 text-center">
                {guests.rooms}
              </Text>
              <TouchableOpacity
                onPress={() => setGuests(prev => ({ ...prev, rooms: prev.rooms + 1 }))}
                className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center"
              >
                <Text className="text-primary font-medium">+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Search Button */}
      <TouchableOpacity
        onPress={handleSearch}
        className="bg-primary py-4 px-6 rounded-lg items-center justify-center"
      >
        <Text className="text-white font-semibold text-lg">
          {t('search')}
        </Text>
      </TouchableOpacity>

      {/* Recent Searches */}
      <View className="mt-8">
        <Text className="text-sm font-medium text-gray-700 mb-3">
          {isArabic ? 'عمليات البحث الأخيرة' : 'Recent Searches'}
        </Text>
        <View className="space-y-2">
          <View className="bg-white p-3 rounded-lg border border-gray-200 flex-row items-center gap-3">
            <Ionicons name="time-outline" size={16} color="#9CA3AF" />
            <Text className="text-gray-700 flex-1">
              الرياض
            </Text>
          </View>
          <View className="bg-white p-3 rounded-lg border border-gray-200 flex-row items-center gap-3">
            <Ionicons name="time-outline" size={16} color="#9CA3AF" />
            <Text className="text-gray-700 flex-1">
              دبي
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}