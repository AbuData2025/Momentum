import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const statusColors = {
  Applied: '#4a9ef5',
  Interview: '#22c983',
  'In Review': '#f5a623',
  Rejected: '#e85555',
  Offer: '#9d8ff7',
};

export default function JobSearchScreen({ navigation }) {
  const [apps, setApps] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadApps();
    }, [])
  );

  const loadApps = async () => {
    try {
      const stored = await AsyncStorage.getItem('applications');
      if (stored) setApps(JSON.parse(stored));
    } catch (e) {
      console.log('Error loading apps:', e);
    }
  };

  const deleteApp = (id) => {
    Alert.alert('Delete Application', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: async () => {
          const updated = apps.filter(a => a.id !== id);
          setApps(updated);
          await AsyncStorage.setItem('applications', JSON.stringify(updated));
        }
      }
    ]);
  };

  const total = apps.length;
  const weekApps = apps.slice(0, 5).length;
  const pct = total === 0 ? 0 : Math.min(100, Math.round((weekApps / 5) * 100));

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Job Search</Text>
        <View style={{ width: 50 }} />
      </View>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.statCard}>
          <View>
            <Text style={s.statSub}>This Week</Text>
            <Text style={s.statBig}>{weekApps} / 5</Text>
            <Text style={s.statLabel}>Applications</Text>
          </View>
          <View style={s.circle}>
            <Text style={s.circleText}>{pct}%</Text>
          </View>
        </View>

        <View style={s.rowBetween}>
          <Text style={s.sectionTitle}>Applications ({total})</Text>
        </View>

        {apps.length === 0 && (
          <View style={s.emptyState}>
            <Text style={{ fontSize: 40 }}>💼</Text>
            <Text style={s.emptyText}>No applications yet</Text>
            <Text style={s.emptySub}>Tap below to add your first one</Text>
          </View>
        )}

        {apps.map((app) => (
          <TouchableOpacity
            key={app.id}
            style={s.appCard}
            onLongPress={() => deleteApp(app.id)}
          >
            <View style={{ flex: 1 }}>
              <Text style={s.company}>{app.company}</Text>
              <Text style={s.role}>{app.role}</Text>
              <Text style={s.date}>Applied {app.date}</Text>
              {app.notes ? <Text style={s.notes}>📝 {app.notes}</Text> : null}
            </View>
            <View style={[s.pill, { backgroundColor: (statusColors[app.status] || '#4a9ef5') + '25' }]}>
              <Text style={[s.pillText, { color: statusColors[app.status] || '#4a9ef5' }]}>{app.status}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={s.addBtn} onPress={() => navigation.navigate('AddApplication')}>
          <Text style={s.addBtnText}>+ Add Application</Text>
        </TouchableOpacity>
        <Text style={s.hint}>💡 Long press an application to delete it</Text>
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
  statCard: { backgroundColor: '#16161e', borderRadius: 14, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  statSub: { fontSize: 12, color: '#5a5a78' },
  statBig: { fontSize: 28, fontWeight: '800', color: '#9d8ff7' },
  statLabel: { fontSize: 12, color: '#9898b0' },
  circle: { width: 64, height: 64, borderRadius: 32, borderWidth: 4, borderColor: '#7c6ef5', alignItems: 'center', justifyContent: 'center' },
  circleText: { fontSize: 16, fontWeight: '800', color: '#9d8ff7' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#9898b0', textTransform: 'uppercase', letterSpacing: 0.5 },
  appCard: { backgroundColor: '#16161e', borderRadius: 14, padding: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  company: { fontSize: 15, fontWeight: '700', color: '#e8e8f0' },
  role: { fontSize: 13, color: '#9898b0', marginTop: 2 },
  date: { fontSize: 11, color: '#5a5a78', marginTop: 2 },
  notes: { fontSize: 11, color: '#5a5a78', marginTop: 4 },
  pill: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  pillText: { fontSize: 12, fontWeight: '700' },
  addBtn: { backgroundColor: '#7c6ef5', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 8 },
  addBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: 40, gap: 8 },
  emptyText: { fontSize: 16, fontWeight: '700', color: '#9898b0' },
  emptySub: { fontSize: 13, color: '#5a5a78' },
  hint: { fontSize: 11, color: '#5a5a78', textAlign: 'center', marginTop: 12 },
});