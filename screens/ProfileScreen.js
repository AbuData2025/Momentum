import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({
    name: 'Abulele Mndini',
    email: 'abulele.mndini@gmail.com',
    goal1: 'Nelson Mandela Half Marathon',
    goal1Date: '18 Oct 2025',
    goal2: 'Land a great IT role',
    goal2Date: 'Before Dec 2025',
  });

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const loadProfile = async () => {
    try {
      const stored = await AsyncStorage.getItem('profile');
      if (stored) setProfile(JSON.parse(stored));
    } catch (e) {}
  };

  const initials = profile.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}><Text style={s.title}>Profile</Text></View>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.avatarRow}>
          <View style={s.avatar}><Text style={s.avatarText}>{initials}</Text></View>
          <View>
            <Text style={s.name}>{profile.name}</Text>
            <Text style={s.email}>{profile.email}</Text>
          </View>
        </View>

        <View style={s.card}>
          <View style={s.rowBetween}>
            <Text style={s.cardTitle}>Goals</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <Text style={s.edit}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={s.goalRow}>
            <View style={[s.goalIcon, { backgroundColor: 'rgba(34,201,131,0.15)' }]}><Text style={{ fontSize: 18 }}>🏃</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={s.goalTitle}>{profile.goal1}</Text>
              <Text style={s.goalSub}>{profile.goal1Date}</Text>
            </View>
          </View>
          <View style={s.goalRow}>
            <View style={[s.goalIcon, { backgroundColor: 'rgba(124,110,245,0.15)' }]}><Text style={{ fontSize: 18 }}>💼</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={s.goalTitle}>{profile.goal2}</Text>
              <Text style={s.goalSub}>{profile.goal2Date}</Text>
            </View>
          </View>
        </View>

        {[
          { icon: '🔔', label: 'Notifications', onPress: () => {} },
          { icon: '📂', label: 'Categories', onPress: () => {} },
          { icon: '☁️', label: 'Backup & Sync', onPress: () => {} },
          { icon: 'ℹ️', label: 'About Momentum', onPress: () => {} },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={s.settingRow} onPress={item.onPress}>
            <Text style={s.settingText}>{item.icon}  {item.label}</Text>
            <Text style={{ color: '#5a5a78', fontSize: 18 }}>›</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={s.logoutBtn}>
          <Text style={s.logoutText}>Log Out</Text>
        </TouchableOpacity>
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f14' },
  scroll: { flex: 1, paddingHorizontal: 20 },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontSize: 24, fontWeight: '800', color: '#e8e8f0' },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 24 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#7c6ef5', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 22, fontWeight: '800', color: 'white' },
  name: { fontSize: 18, fontWeight: '800', color: '#e8e8f0' },
  email: { fontSize: 13, color: '#5a5a78', marginTop: 2 },
  card: { backgroundColor: '#16161e', borderRadius: 14, padding: 16, marginBottom: 16 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#e8e8f0' },
  edit: { fontSize: 13, color: '#9d8ff7' },
  goalRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  goalIcon: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  goalTitle: { fontSize: 14, fontWeight: '600', color: '#e8e8f0' },
  goalSub: { fontSize: 12, color: '#5a5a78', marginTop: 2 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#1e1e2a' },
  settingText: { fontSize: 15, color: '#e8e8f0' },
  logoutBtn: { marginTop: 20, borderWidth: 1, borderColor: 'rgba(232,85,85,0.3)', borderRadius: 14, padding: 16, alignItems: 'center' },
  logoutText: { color: '#e85555', fontSize: 15, fontWeight: '700' },
});