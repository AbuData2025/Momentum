import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const reminders = [
  { emoji: '🏃', title: 'Easy Run – 5 km', time: '6:00 AM', note: 'Time to get it done!', color: '#22c983' },
  { emoji: '💼', title: 'Apply to 3 Jobs', time: '10:00 AM', note: 'Small steps, big future!', color: '#7c6ef5' },
  { emoji: '🧘', title: 'Stretch & Recovery', time: '7:00 PM', note: "Don't skip recovery", color: '#4a9ef5' },
];

export default function RemindersScreen({ navigation }) {
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Reminders</Text>
        <View style={{ width: 50 }} />
      </View>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={s.dayLabel}>Today</Text>
        {reminders.map((r, i) => (
          <View key={i} style={s.item}>
            <View style={[s.iconBox, { backgroundColor: r.color + '22' }]}>
              <Text style={{ fontSize: 20 }}>{r.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.itemTitle}>{r.title}</Text>
              <Text style={s.itemSub}>{r.time} · {r.note}</Text>
            </View>
            <Text style={{ fontSize: 20 }}>🔔</Text>
          </View>
        ))}
        <Text style={[s.dayLabel, { marginTop: 16 }]}>Tomorrow</Text>
        <View style={s.item}>
          <View style={[s.iconBox, { backgroundColor: '#22c98322' }]}>
            <Text style={{ fontSize: 20 }}>🏃</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.itemTitle}>Long Run – 14 km</Text>
            <Text style={s.itemSub}>6:00 AM · Prepare for a strong weekend!</Text>
          </View>
          <Text style={{ fontSize: 20, opacity: 0.3 }}>🔔</Text>
        </View>
        <TouchableOpacity style={s.addBtn}>
          <Text style={s.addBtnText}>+ Add Reminder</Text>
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
  dayLabel: { fontSize: 13, fontWeight: '700', color: '#9898b0', marginBottom: 12 },
  item: { backgroundColor: '#16161e', borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  iconBox: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  itemTitle: { fontSize: 14, fontWeight: '700', color: '#e8e8f0' },
  itemSub: { fontSize: 12, color: '#5a5a78', marginTop: 2 },
  addBtn: { backgroundColor: '#7c6ef5', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 16 },
  addBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
});