import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RACE_DATE = new Date('2025-10-18');
const daysTo = () => Math.ceil((RACE_DATE - new Date()) / 86400000);

export default function DashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={s.safe}>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.greeting}>Good morning,</Text>
            <Text style={s.name}>Abulele 👋</Text>
          </View>
          <TouchableOpacity style={s.bellBtn} onPress={() => navigation.navigate('Reminders')}>
            <Text style={{ fontSize: 20 }}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Race Banner */}
        <TouchableOpacity style={s.banner} onPress={() => navigation.navigate('Training')}>
          <View style={s.bannerBadge}>
            <Text style={s.bannerBadgeText}>🏃 {daysTo()} days to go</Text>
          </View>
          <Text style={s.bannerTitle}>Nelson Mandela Half Marathon</Text>
          <Text style={s.bannerSub}>18 October 2025</Text>
        </TouchableOpacity>

        {/* Overview Cards */}
        <Text style={s.sectionTitle}>Today's Overview</Text>
        <View style={s.row}>
          <TouchableOpacity style={[s.card, s.halfCard]} onPress={() => navigation.navigate('Training')}>
            <Text style={s.cardLabel}>Training</Text>
            <Text style={[s.cardBig, { color: '#22c983' }]}>72%</Text>
            <Text style={s.cardSub}>4/6 Workouts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.card, s.halfCard]} onPress={() => navigation.navigate('JobSearch')}>
            <Text style={s.cardLabel}>Job Search</Text>
            <Text style={[s.cardBig, { color: '#9d8ff7' }]}>60%</Text>
            <Text style={s.cardSub}>3/5 Applications</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Plan */}
        <View style={s.rowBetween}>
          <Text style={s.sectionTitle}>Today's Plan</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
            <Text style={s.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={s.planItem} onPress={() => navigation.navigate('Workout')}>
          <View style={[s.planIcon, { backgroundColor: 'rgba(34,201,131,0.15)' }]}>
            <Text style={{ fontSize: 20 }}>🏃</Text>
          </View>
          <View style={s.planText}>
            <Text style={s.planTitle}>Easy Run</Text>
            <Text style={s.planSub}>6:00 AM · 5 km</Text>
          </View>
          <Text style={{ fontSize: 20 }}>✅</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.planItem} onPress={() => navigation.navigate('JobSearch')}>
          <View style={[s.planIcon, { backgroundColor: 'rgba(124,110,245,0.15)' }]}>
            <Text style={{ fontSize: 20 }}>💼</Text>
          </View>
          <View style={s.planText}>
            <Text style={s.planTitle}>Apply to 3 Jobs</Text>
            <Text style={s.planSub}>10:00 AM</Text>
          </View>
          <View style={s.emptyCircle} />
        </TouchableOpacity>

        {/* Quick Stats */}
        <Text style={s.sectionTitle}>Quick Stats</Text>
        <View style={s.row}>
          <View style={[s.statCard]}>
            <Text style={[s.statNum, { color: '#22c983' }]}>5</Text>
            <Text style={s.statLabel}>Run streak</Text>
          </View>
          <View style={[s.statCard]}>
            <Text style={[s.statNum, { color: '#9d8ff7' }]}>12</Text>
            <Text style={s.statLabel}>Apps this month</Text>
          </View>
          <View style={[s.statCard]}>
            <Text style={[s.statNum, { color: '#f5a623' }]}>75%</Text>
            <Text style={s.statLabel}>Consistency</Text>
          </View>
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f14' },
  scroll: { flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
  greeting: { fontSize: 13, color: '#9898b0' },
  name: { fontSize: 24, fontWeight: '800', color: '#e8e8f0' },
  bellBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#1e1e2a', alignItems: 'center', justifyContent: 'center' },
  banner: { borderRadius: 16, backgroundColor: '#1a1a2e', padding: 18, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(124,110,245,0.3)' },
  bannerBadge: { backgroundColor: 'rgba(124,110,245,0.25)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 8 },
  bannerBadgeText: { color: '#9d8ff7', fontWeight: '700', fontSize: 13 },
  bannerTitle: { fontSize: 17, fontWeight: '800', color: '#e8e8f0', marginBottom: 4 },
  bannerSub: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#9898b0', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10, marginTop: 4 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  card: { backgroundColor: '#16161e', borderRadius: 14, padding: 16 },
  halfCard: { flex: 1 },
  cardLabel: { fontSize: 13, color: '#9898b0', marginBottom: 6 },
  cardBig: { fontSize: 26, fontWeight: '800' },
  cardSub: { fontSize: 11, color: '#5a5a78', marginTop: 2 },
  viewAll: { fontSize: 13, color: '#9d8ff7', marginBottom: 10 },
  planItem: { backgroundColor: '#16161e', borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  planIcon: { width: 42, height: 42, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  planText: { flex: 1 },
  planTitle: { fontSize: 15, fontWeight: '700', color: '#e8e8f0' },
  planSub: { fontSize: 12, color: '#9898b0', marginTop: 2 },
  emptyCircle: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: '#2a2a3a' },
  statCard: { flex: 1, backgroundColor: '#16161e', borderRadius: 12, padding: 12, alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: '800' },
  statLabel: { fontSize: 10, color: '#5a5a78', marginTop: 2, textAlign: 'center' },
});