import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RACE_DATE = new Date('2025-10-18');
const daysTo = () => Math.ceil((RACE_DATE - new Date()) / 86400000);

export default function ProgressScreen() {
  const [apps, setApps] = useState([]);
  const [completed, setCompleted] = useState({});

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const load = async () => {
    try {
      const a = await AsyncStorage.getItem('applications');
      const c = await AsyncStorage.getItem('completedWorkouts');
      if (a) setApps(JSON.parse(a));
      if (c) setCompleted(JSON.parse(c));
    } catch (e) {}
  };

  const totalWorkouts = Object.keys(completed).length;
  const completedWorkouts = Object.values(completed).filter(Boolean).length;
  const consistency = totalWorkouts === 0 ? 0 : Math.round((completedWorkouts / totalWorkouts) * 100);

  const thisMonth = new Date().getMonth();
  const monthApps = apps.filter(a => {
    const d = new Date(a.id ? parseInt(a.id) : Date.now());
    return d.getMonth() === thisMonth;
  });

  const statusCounts = apps.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  const runStreak = Math.min(completedWorkouts, 99);
  const appStreak = Math.min(apps.length, 99);

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}><Text style={s.title}>Progress</Text></View>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Race Countdown */}
        <View style={s.raceCard}>
          <Text style={s.raceEmoji}>🏁</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.raceTitle}>Nelson Mandela Half Marathon</Text>
            <Text style={s.raceSub}>18 October 2025</Text>
          </View>
          <View style={s.raceDays}>
            <Text style={s.raceDaysNum}>{daysTo()}</Text>
            <Text style={s.raceDaysLabel}>days</Text>
          </View>
        </View>

        {/* Training Consistency */}
        <View style={s.card}>
          <View style={s.rowBetween}>
            <View>
              <Text style={s.cardLabel}>Training Consistency</Text>
              <Text style={s.cardSub}>All time</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[s.bigNum, { color: '#22c983' }]}>{consistency}%</Text>
              <Text style={s.cardSub}>{completedWorkouts} / {totalWorkouts} workouts</Text>
            </View>
          </View>
          <View style={s.progressBar}>
            <View style={[s.progressFill, { width: `${consistency}%`, backgroundColor: '#22c983' }]} />
          </View>
          {totalWorkouts === 0 && (
            <Text style={s.emptyHint}>Complete workouts in Training to see your consistency</Text>
          )}
        </View>

        {/* Job Applications */}
        <View style={s.card}>
          <View style={s.rowBetween}>
            <View>
              <Text style={s.cardLabel}>Job Applications</Text>
              <Text style={s.cardSub}>Total tracked</Text>
            </View>
            <Text style={[s.bigNum, { color: '#9d8ff7' }]}>{apps.length}</Text>
          </View>
          {/* Status breakdown */}
          {Object.keys(statusCounts).length > 0 ? (
            <View style={s.statusGrid}>
              {Object.entries(statusCounts).map(([status, count]) => (
                <View key={status} style={s.statusItem}>
                  <Text style={s.statusCount}>{count}</Text>
                  <Text style={s.statusLabel}>{status}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={s.emptyHint}>Add applications in Job Search to track progress</Text>
          )}
        </View>

        {/* Streaks */}
        <Text style={s.sectionTitle}>Current Streaks</Text>
        <View style={s.streakRow}>
          <View style={s.streakCard}>
            <Text style={{ fontSize: 32 }}>🏃</Text>
            <Text style={[s.bigNum, { color: '#22c983' }]}>{runStreak}</Text>
            <Text style={s.cardSub}>Workouts done</Text>
          </View>
          <View style={s.streakCard}>
            <Text style={{ fontSize: 32 }}>💼</Text>
            <Text style={[s.bigNum, { color: '#9d8ff7' }]}>{appStreak}</Text>
            <Text style={s.cardSub}>Apps tracked</Text>
          </View>
        </View>

        {/* Motivation */}
        <View style={s.motivCard}>
          <Text style={s.motivText}>
            {daysTo() > 60
              ? "🌱 Early days — consistency now builds your race day foundation."
              : daysTo() > 30
              ? "🔥 You're in the peak phase. Every run counts now."
              : daysTo() > 14
              ? "⚡ Less than a month to go. Trust your training!"
              : "🏁 Race week is coming. Rest, stay sharp, believe in yourself!"}
          </Text>
        </View>

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
  raceCard: { backgroundColor: '#1a1a2e', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(124,110,245,0.3)' },
  raceEmoji: { fontSize: 28 },
  raceTitle: { fontSize: 14, fontWeight: '700', color: '#e8e8f0' },
  raceSub: { fontSize: 12, color: '#5a5a78', marginTop: 2 },
  raceDays: { alignItems: 'center' },
  raceDaysNum: { fontSize: 28, fontWeight: '800', color: '#9d8ff7' },
  raceDaysLabel: { fontSize: 11, color: '#5a5a78' },
  card: { backgroundColor: '#16161e', borderRadius: 14, padding: 16, marginBottom: 14 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  cardLabel: { fontSize: 14, fontWeight: '600', color: '#9898b0' },
  cardSub: { fontSize: 11, color: '#5a5a78', marginTop: 2 },
  bigNum: { fontSize: 28, fontWeight: '800', color: '#e8e8f0' },
  progressBar: { backgroundColor: '#2a2a3a', borderRadius: 4, height: 6 },
  progressFill: { height: 6, borderRadius: 4 },
  statusGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  statusItem: { backgroundColor: '#1e1e2a', borderRadius: 10, padding: 10, alignItems: 'center', minWidth: 70 },
  statusCount: { fontSize: 20, fontWeight: '800', color: '#9d8ff7' },
  statusLabel: { fontSize: 11, color: '#5a5a78', marginTop: 2 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#9898b0', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 },
  streakRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  streakCard: { flex: 1, backgroundColor: '#16161e', borderRadius: 14, padding: 16, alignItems: 'center', gap: 6 },
  motivCard: { backgroundColor: '#1a1a2e', borderRadius: 14, padding: 16, borderLeftWidth: 3, borderLeftColor: '#7c6ef5' },
  motivText: { fontSize: 14, color: '#9898b0', lineHeight: 22 },
  emptyHint: { fontSize: 12, color: '#5a5a78', marginTop: 8, fontStyle: 'italic' },
});