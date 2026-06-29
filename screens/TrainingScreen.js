import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RACE_DATE = new Date('2025-10-18');

const daysTo = () => Math.ceil((RACE_DATE - new Date()) / 86400000);

const generatePlan = () => {
  const today = new Date();
  const plan = [];
  const totalDays = Math.ceil((RACE_DATE - today) / 86400000);
  const totalWeeks = Math.floor(totalDays / 7);

  for (let week = 0; week < totalWeeks; week++) {
    const isTaper = week >= totalWeeks - 2;
    const isPeak = week >= totalWeeks - 6 && !isTaper;
    const weekPlan = [];

    const longRunDist = isTaper
      ? Math.max(8, 18 - week * 2)
      : isPeak
      ? Math.min(18, 10 + week)
      : 8 + week;

    const easyDist = isTaper ? 4 : isPeak ? 6 : 5;
    const tempoDist = isTaper ? 4 : isPeak ? 7 : 5;
    const intervalReps = isPeak ? 6 : 4;

    const schedule = [
      { type: 'Easy Run', dist: `${easyDist} km`, emoji: '🏃', color: '#22c983' },
      { type: 'Interval Run', dist: `${intervalReps} x 800m`, emoji: '⚡', color: '#f5a623' },
      { type: 'Easy Run', dist: `${easyDist} km`, emoji: '🏃', color: '#22c983' },
      { type: 'Rest Day', dist: '—', emoji: '😴', color: '#5a5a78', rest: true },
      { type: 'Tempo Run', dist: `${tempoDist} km`, emoji: '🔥', color: '#e85555' },
      { type: 'Long Run', dist: `${longRunDist} km`, emoji: '🎯', color: '#7c6ef5' },
      { type: 'Rest Day', dist: '—', emoji: '😴', color: '#5a5a78', rest: true },
    ];

    for (let day = 0; day < 7; day++) {
      const date = new Date(today);
      date.setDate(today.getDate() + week * 7 + day);
      weekPlan.push({
        ...schedule[day],
        date: date.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' }),
        dateKey: date.toISOString().split('T')[0],
        week: week + 1,
      });
    }
    plan.push(weekPlan);
  }
  return plan;
};

const plan = generatePlan();

export default function TrainingScreen({ navigation }) {
  const [completedWorkouts, setCompletedWorkouts] = useState({});
  const [selectedWeek, setSelectedWeek] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadCompleted();
    }, [])
  );

  const loadCompleted = async () => {
    try {
      const stored = await AsyncStorage.getItem('completedWorkouts');
      if (stored) setCompletedWorkouts(JSON.parse(stored));
    } catch (e) {}
  };

  const toggleWorkout = async (dateKey) => {
    const updated = { ...completedWorkouts, [dateKey]: !completedWorkouts[dateKey] };
    setCompletedWorkouts(updated);
    await AsyncStorage.setItem('completedWorkouts', JSON.stringify(updated));
  };

  const currentWeek = plan[selectedWeek] || [];
  const completedThisWeek = currentWeek.filter(d => !d.rest && completedWorkouts[d.dateKey]).length;
  const totalThisWeek = currentWeek.filter(d => !d.rest).length;
  const pct = totalThisWeek === 0 ? 0 : Math.round((completedThisWeek / totalThisWeek) * 100);

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Training</Text>
        <View style={{ width: 50 }} />
      </View>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Race Banner */}
        <View style={s.banner}>
          <View style={s.badge}>
            <Text style={s.badgeText}>🏃 {daysTo()} days to go</Text>
          </View>
          <Text style={s.bannerTitle}>Nelson Mandela Half Marathon</Text>
          <Text style={s.bannerSub}>18 October 2025 · 21.1 km</Text>
        </View>

        {/* Weekly Progress */}
        <View style={s.progressCard}>
          <View style={s.rowBetween}>
            <Text style={s.cardLabel}>Week {selectedWeek + 1} Progress</Text>
            <Text style={[s.cardLabel, { color: '#22c983' }]}>{completedThisWeek}/{totalThisWeek} runs · {pct}%</Text>
          </View>
          <View style={s.progressBar}>
            <View style={[s.progressFill, { width: `${pct}%` }]} />
          </View>
        </View>

        {/* Week Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {plan.map((_, i) => (
            <TouchableOpacity
              key={i}
              style={[s.weekPill, selectedWeek === i && s.weekPillActive]}
              onPress={() => setSelectedWeek(i)}
            >
              <Text style={[s.weekPillText, selectedWeek === i && s.weekPillTextActive]}>
                Wk {i + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Phase Label */}
        <Text style={s.phaseLabel}>
          {selectedWeek >= plan.length - 2
            ? '🧘 Taper Phase — ease into race day'
            : selectedWeek >= plan.length - 6
            ? '🔥 Peak Phase — push your limits'
            : '🌱 Base Phase — build your foundation'}
        </Text>

        {/* Daily Schedule */}
        {currentWeek.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={s.dayRow}
            onPress={() => !item.rest && toggleWorkout(item.dateKey)}
            onLongPress={() => !item.rest && navigation.navigate('Workout', { workout: item })}
          >
            <View style={[s.dayDot, { backgroundColor: item.color }]} />
            <View style={{ flex: 1 }}>
              <Text style={s.dayDate}>{item.date}</Text>
              <Text style={[s.dayType, item.rest && { color: '#5a5a78' }]}>
                {item.emoji} {item.type}
              </Text>
              <Text style={s.dayDist}>{item.dist}</Text>
            </View>
            {!item.rest && (
              completedWorkouts[item.dateKey]
                ? <View style={s.checkDone}><Text style={{ color: 'white', fontSize: 14 }}>✓</Text></View>
                : <View style={s.checkEmpty} />
            )}
          </TouchableOpacity>
        ))}

        <Text style={s.hint}>💡 Tap a workout to mark complete · Long press for details</Text>
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
  banner: { borderRadius: 16, backgroundColor: '#1a1a2e', padding: 18, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(124,110,245,0.3)' },
  badge: { backgroundColor: 'rgba(124,110,245,0.25)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 8 },
  badgeText: { color: '#9d8ff7', fontWeight: '700', fontSize: 13 },
  bannerTitle: { fontSize: 16, fontWeight: '800', color: '#e8e8f0', marginBottom: 4 },
  bannerSub: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  progressCard: { backgroundColor: '#16161e', borderRadius: 14, padding: 16, marginBottom: 16 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  cardLabel: { fontSize: 13, fontWeight: '600', color: '#9898b0' },
  progressBar: { backgroundColor: '#2a2a3a', borderRadius: 4, height: 6 },
  progressFill: { backgroundColor: '#22c983', height: 6, borderRadius: 4 },
  weekPill: { backgroundColor: '#1e1e2a', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, borderWidth: 1, borderColor: '#2a2a3a' },
  weekPillActive: { backgroundColor: 'rgba(124,110,245,0.2)', borderColor: '#7c6ef5' },
  weekPillText: { color: '#5a5a78', fontSize: 13, fontWeight: '600' },
  weekPillTextActive: { color: '#9d8ff7' },
  phaseLabel: { fontSize: 13, color: '#9898b0', marginBottom: 14, fontStyle: 'italic' },
  dayRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#1e1e2a' },
  dayDot: { width: 10, height: 10, borderRadius: 5 },
  dayDate: { fontSize: 11, color: '#5a5a78', marginBottom: 2 },
  dayType: { fontSize: 14, fontWeight: '700', color: '#e8e8f0' },
  dayDist: { fontSize: 12, color: '#5a5a78', marginTop: 2 },
  checkDone: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#22c983', alignItems: 'center', justifyContent: 'center' },
  checkEmpty: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: '#2a2a3a' },
  hint: { fontSize: 11, color: '#5a5a78', textAlign: 'center', marginTop: 16 },
});