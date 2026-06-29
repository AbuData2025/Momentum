import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkoutScreen({ navigation }) {
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Workout Details</Text>
        <View style={{ width: 50 }} />
      </View>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.topCard}>
          <View style={s.iconBox}>
            <Text style={{ fontSize: 28 }}>🏃</Text>
          </View>
          <View>
            <Text style={s.workoutTitle}>Easy Run</Text>
            <Text style={s.workoutSub}>Recovery pace</Text>
          </View>
        </View>
        <View style={s.statsRow}>
          <View style={s.statBox}><Text style={s.statNum}>5 km</Text><Text style={s.statLabel}>Distance</Text></View>
          <View style={s.statBox}><Text style={s.statNum}>5:45</Text><Text style={s.statLabel}>/km pace</Text></View>
          <View style={s.statBox}><Text style={s.statNum}>28:45</Text><Text style={s.statLabel}>Time</Text></View>
        </View>
        <View style={s.card}>
          <Text style={s.cardLabel}>Notes</Text>
          <Text style={s.cardText}>Felt good. Nice and easy pace.</Text>
        </View>
        <View style={[s.card, s.completedCard]}>
          <View>
            <Text style={[s.cardLabel, { color: '#22c983' }]}>Completed ✅</Text>
            <Text style={s.cardSub}>Today, 6:28 AM</Text>
          </View>
        </View>
        <View style={s.card}>
          <Text style={s.cardLabel}>How did it feel?</Text>
          <View style={s.feelRow}>
            {['😤', '😓', '😐', '😊', '🤩'].map((e, i) => (
              <View key={i} style={[s.feelItem, i === 3 && s.feelSelected]}>
                <Text style={{ fontSize: i === 3 ? 28 : 22 }}>{e}</Text>
              </View>
            ))}
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  back: { color: '#9898b0', fontSize: 15 },
  title: { fontSize: 20, fontWeight: '800', color: '#e8e8f0' },
  topCard: { backgroundColor: 'rgba(34,201,131,0.1)', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  iconBox: { width: 52, height: 52, backgroundColor: 'rgba(34,201,131,0.2)', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  workoutTitle: { fontSize: 22, fontWeight: '800', color: '#e8e8f0' },
  workoutSub: { fontSize: 13, color: '#22c983' },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statBox: { flex: 1, backgroundColor: '#16161e', borderRadius: 12, padding: 14, alignItems: 'center' },
  statNum: { fontSize: 18, fontWeight: '800', color: '#22c983' },
  statLabel: { fontSize: 11, color: '#5a5a78', marginTop: 2 },
  card: { backgroundColor: '#16161e', borderRadius: 14, padding: 16, marginBottom: 12 },
  completedCard: { backgroundColor: 'rgba(34,201,131,0.08)', borderWidth: 1, borderColor: 'rgba(34,201,131,0.2)' },
  cardLabel: { fontSize: 13, color: '#9898b0', marginBottom: 8, fontWeight: '600' },
  cardText: { fontSize: 15, color: '#e8e8f0' },
  cardSub: { fontSize: 12, color: '#5a5a78' },
  feelRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  feelItem: { alignItems: 'center', padding: 8, borderRadius: 10, opacity: 0.4 },
  feelSelected: { opacity: 1, backgroundColor: 'rgba(34,201,131,0.1)' },
});