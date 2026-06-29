import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('Abulele Mndini');
  const [email, setEmail] = useState('abulele.mndini@gmail.com');
  const [goal1, setGoal1] = useState('Nelson Mandela Half Marathon');
  const [goal1Date, setGoal1Date] = useState('18 Oct 2025');
  const [goal2, setGoal2] = useState('Land a great IT role');
  const [goal2Date, setGoal2Date] = useState('Before Dec 2025');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const stored = await AsyncStorage.getItem('profile');
      if (stored) {
        const p = JSON.parse(stored);
        setName(p.name || 'Abulele Mndini');
        setEmail(p.email || 'abulele.mndini@gmail.com');
        setGoal1(p.goal1 || 'Nelson Mandela Half Marathon');
        setGoal1Date(p.goal1Date || '18 Oct 2025');
        setGoal2(p.goal2 || 'Land a great IT role');
        setGoal2Date(p.goal2Date || 'Before Dec 2025');
      }
    } catch (e) {}
  };

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('profile', JSON.stringify({ name, email, goal1, goal1Date, goal2, goal2Date }));
      Alert.alert('Saved! ✅', 'Your profile has been updated.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (e) {
      Alert.alert('Error', 'Could not save profile.');
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Edit Profile</Text>
        <View style={{ width: 50 }} />
      </View>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.avatarSection}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>{name.split(' ').map(n => n[0]).join('').slice(0,2)}</Text>
          </View>
          <TouchableOpacity><Text style={s.changePhoto}>Change Photo</Text></TouchableOpacity>
        </View>

        <Text style={s.sectionTitle}>Personal Info</Text>
        <Text style={s.label}>Full Name</Text>
        <TextInput style={s.input} value={name} onChangeText={setName} placeholderTextColor="#5a5a78" />

        <Text style={s.label}>Email</Text>
        <TextInput style={s.input} value={email} onChangeText={setEmail} placeholderTextColor="#5a5a78" keyboardType="email-address" />

        <Text style={s.sectionTitle}>Goals</Text>
        <Text style={s.label}>🏃 Running Goal</Text>
        <TextInput style={s.input} value={goal1} onChangeText={setGoal1} placeholderTextColor="#5a5a78" />
        <Text style={s.label}>Target Date</Text>
        <TextInput style={s.input} value={goal1Date} onChangeText={setGoal1Date} placeholderTextColor="#5a5a78" />

        <Text style={s.label}>💼 Career Goal</Text>
        <TextInput style={s.input} value={goal2} onChangeText={setGoal2} placeholderTextColor="#5a5a78" />
        <Text style={s.label}>Target Date</Text>
        <TextInput style={s.input} value={goal2Date} onChangeText={setGoal2Date} placeholderTextColor="#5a5a78" />

        <TouchableOpacity style={s.saveBtn} onPress={saveProfile}>
          <Text style={s.saveBtnText}>Save Profile</Text>
        </TouchableOpacity>
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f14' },
  scroll: { flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  back: { color: '#9898b0', fontSize: 15 },
  title: { fontSize: 20, fontWeight: '800', color: '#e8e8f0' },
  avatarSection: { alignItems: 'center', marginBottom: 28, gap: 10 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#7c6ef5', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 28, fontWeight: '800', color: 'white' },
  changePhoto: { fontSize: 14, color: '#9d8ff7', fontWeight: '600' },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#9898b0', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 14, marginTop: 8 },
  label: { fontSize: 13, color: '#9898b0', marginBottom: 8, fontWeight: '600' },
  input: { backgroundColor: '#16161e', borderRadius: 12, padding: 14, color: '#e8e8f0', fontSize: 15, marginBottom: 16, borderWidth: 1, borderColor: '#2a2a3a' },
  saveBtn: { backgroundColor: '#7c6ef5', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 8 },
  saveBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
});