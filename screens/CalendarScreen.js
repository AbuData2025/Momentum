import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const dates = [23, 24, 25, 26, 27, 28, 29];
const events = [
  { time: '6:00 AM', title: 'Easy Run', sub: '5 km', color: '#22c983', screen: 'Workout' },
  { time: '10:00 AM', title: 'Apply to 3 Jobs', sub: 'Job Search Task', color: '#7c6ef5', screen: 'JobSearch' },
  { time: '12:30 PM', title: 'CV Update', sub: 'Personal Task', color: '#f5a623', screen: null },
  { time: '6:00 PM', title: 'Rest & Stretch', sub: 'Recovery', color: '#4a9ef5', screen: null },
];

export default function CalendarScreen({ navigation }) {
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <Text style={s.title}>Calendar</Text>
      </View>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.tabBar}>
          <View style={s.tabActive}><Text style={s.tabTextActive}>Week</Text></View>
          <TouchableOpacity style={s.tab}><Text style={s.tabText}>Month</Text></TouchableOpacity>
        </View>
        <View style={s.weekRow}>
          {days.map((d, i) => (
            <View key={i} style={s.dayCol}>
              <Text style={s.dayName}>{d}</Text>
              <View style={[s.dateCircle, dates[i] === 25 && s.dateCircleActive]}>
                <Text style={[s.dateNum, dates[i] === 25 && s.dateNumActive]}>{dates[i]}</Text>
              </View>
              {[0,1,2,4].includes(i) && <View style={[s.dot, { backgroundColor: i===1 ? '#7c6ef5' : '#22c983' }]} />}
            </View>
          ))}
        </View>
        {events.map((e, i) => (
          <TouchableOpacity key={i} style={s.eventRow} onPress={() => e.screen && navigation.navigate(e.screen)}>
            <Text style={s.eventTime}>{e.time}</Text>
            <View style={[s.eventCard, { borderLeftColor: e.color }]}>
              <Text style={s.eventTitle}>{e.title}</Text>
              <Text style={s.eventSub}>{e.sub}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  tabBar: { flexDirection: 'row', backgroundColor: '#1e1e2a', borderRadius: 10, padding: 4, marginBottom: 20 },
  tab: { flex: 1, padding: 8, alignItems: 'center' },
  tabActive: { flex: 1, padding: 8, alignItems: 'center', backgroundColor: '#252535', borderRadius: 8 },
  tabText: { color: '#5a5a78', fontWeight: '600', fontSize: 13 },
  tabTextActive: { color: '#e8e8f0', fontWeight: '700', fontSize: 13 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  dayCol: { alignItems: 'center', gap: 4 },
  dayName: { fontSize: 10, color: '#5a5a78', fontWeight: '600' },
  dateCircle: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  dateCircleActive: { backgroundColor: '#7c6ef5' },
  dateNum: { fontSize: 14, fontWeight: '600', color: '#9898b0' },
  dateNumActive: { color: 'white' },
  dot: { width: 5, height: 5, borderRadius: 3 },
  eventRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  eventTime: { fontSize: 11, color: '#5a5a78', width: 58, paddingTop: 4 },
  eventCard: { flex: 1, borderLeftWidth: 3, borderRadius: 0, backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, borderTopRightRadius: 10, borderBottomRightRadius: 10 },
  eventTitle: { fontSize: 14, fontWeight: '700', color: '#e8e8f0' },
  eventSub: { fontSize: 12, color: '#9898b0', marginTop: 2 },
});