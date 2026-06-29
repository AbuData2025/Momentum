import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddApplicationScreen({ navigation }) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Applied');

  const saveApp = async () => {
    if (!company || !role) {
      Alert.alert('Missing Info', 'Please enter a company name and role.');
      return;
    }
    try {
      const existing = await AsyncStorage.getItem('applications');
      const apps = existing ? JSON.parse(existing) : [];
      const newApp = {
        id: Date.now().toString(),
        company,
        role,
        date: date || new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: selectedStatus,
        notes,
      };
      apps.unshift(newApp);
      await AsyncStorage.setItem('applications', JSON.stringify(apps));
      Alert.alert('Saved! 🎉', `${company} application added.`, [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (e) {
      Alert.alert('Error', 'Could not save application.');
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Add Application</Text>
        <View style={{ width: 50 }} />
      </View>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={s.label}>Company</Text>
        <TextInput style={s.input} placeholder="Enter company name" placeholderTextColor="#5a5a78" value={company} onChangeText={setCompany} />

        <Text style={s.label}>Role</Text>
        <TextInput style={s.input} placeholder="Enter role" placeholderTextColor="#5a5a78" value={role} onChangeText={setRole} />

        <Text style={s.label}>Date Applied</Text>
        <TextInput style={s.input} placeholder="e.g. 25 Jun 2025" placeholderTextColor="#5a5a78" value={date} onChangeText={setDate} />

        <Text style={s.label}>Status</Text>
        <View style={s.statusRow}>
          {['Applied', 'Interview', 'In Review', 'Offer', 'Rejected'].map(status => (
            <TouchableOpacity
              key={status}
              style={[s.statusPill, selectedStatus === status && s.statusPillActive]}
              onPress={() => setSelectedStatus(status)}
            >
              <Text style={[s.statusPillText, selectedStatus === status && s.statusPillTextActive]}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={s.label}>Notes</Text>
        <TextInput
          style={[s.input, { height: 90, textAlignVertical: 'top' }]}
          placeholder="Add any notes..."
          placeholderTextColor="#5a5a78"
          multiline
          value={notes}
          onChangeText={setNotes}
        />

        <TouchableOpacity style={s.saveBtn} onPress={saveApp}>
          <Text style={s.saveBtnText}>Save Application</Text>
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
  label: { fontSize: 13, color: '#9898b0', marginBottom: 8, fontWeight: '600' },
  input: { backgroundColor: '#16161e', borderRadius: 12, padding: 14, color: '#e8e8f0', fontSize: 15, marginBottom: 16, borderWidth: 1, borderColor: '#2a2a3a' },
  statusRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  statusPill: { backgroundColor: '#1e1e2a', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: '#2a2a3a' },
  statusPillActive: { backgroundColor: 'rgba(124,110,245,0.2)', borderColor: '#7c6ef5' },
  statusPillText: { color: '#9898b0', fontSize: 13, fontWeight: '600' },
  statusPillTextActive: { color: '#9d8ff7' },
  saveBtn: { backgroundColor: '#7c6ef5', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 8 },
  saveBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
});