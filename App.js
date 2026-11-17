import { StatusBar } from 'expo-status-bar';
import { Image, SectionList, StyleSheet, Text, View } from 'react-native';

// Each game's image comes from the Steam store CDN, using the game's Steam app ID.
const steamImage = (appId) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`;

const gameSections = [
  {
    title: 'Indie Gems',
    icon: '💎',
    color: '#4ADE80',
    data: [
      { id: '367520', name: 'Hollow Knight', genre: 'Metroidvania', price: 21.5, rating: 4.9 },
      { id: '413150', name: 'Stardew Valley', genre: 'Farming Sim', price: 21.5, rating: 4.9 },
      { id: '105600', name: 'Terraria', genre: 'Sandbox Adventure', price: 14.5, rating: 4.8 },
      { id: '504230', name: 'Celeste', genre: 'Platformer', price: 28.0, rating: 4.7 },
    ],
  },
  {
    title: 'AAA Blockbusters',
    icon: '🔥',
    color: '#F97316',
    data: [
      { id: '1245620', name: 'Elden Ring', genre: 'Action RPG', price: 79.9, rating: 4.8 },
      { id: '1086940', name: "Baldur's Gate 3", genre: 'Turn-based RPG', price: 79.9, rating: 4.9 },
      { id: '1174180', name: 'Red Dead Redemption 2', genre: 'Open World', price: 89.9, rating: 4.7 },
      { id: '1091500', name: 'Cyberpunk 2077', genre: 'Action RPG', price: 69.9, rating: 4.4 },
    ],
  },
  {
    title: 'Free to Play',
    icon: '🎁',
    color: '#38BDF8',
    data: [
      { id: '730', name: 'Counter-Strike 2', genre: 'Tactical Shooter', price: 0, rating: 4.3 },
      { id: '570', name: 'Dota 2', genre: 'MOBA', price: 0, rating: 4.2 },
      { id: '1172470', name: 'Apex Legends', genre: 'Battle Royale', price: 0, rating: 4.1 },
    ],
  },
];

const GameItem = ({ game, accent }) => {
  const isFree = game.price === 0;

  return (
    <View style={styles.card}>
      <Image source={{ uri: steamImage(game.id) }} style={styles.cover} />

      <View style={styles.info}>
        <View>
          <Text style={styles.gameName} numberOfLines={1}>
            {game.name}
          </Text>
          <Text style={styles.genre}>{game.genre}</Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.rating}>★ {game.rating.toFixed(1)}</Text>
          <View style={[styles.priceTag, { backgroundColor: accent }]}>
            <Text style={styles.priceText}>
              {isFree ? 'FREE' : `$${game.price.toFixed(2)}`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎮 Pixel Vault</Text>
        <Text style={styles.headerSubtitle}>Your pocket game store</Text>
      </View>

      <SectionList
        sections={gameSections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <View style={[styles.sectionHeader, { borderLeftColor: section.color }]}>
            <Text style={styles.sectionIcon}>{section.icon}</Text>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={[styles.sectionCount, { color: section.color }]}>
              {section.data.length} games
            </Text>
          </View>
        )}
        renderItem={({ item, section }) => (
          <GameItem game={item} accent={section.color} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },

  // Top banner
  header: {
    paddingTop: 56,
    paddingBottom: 18,
    paddingHorizontal: 20,
    backgroundColor: '#1E293B',
    borderBottomWidth: 2,
    borderBottomColor: '#6366F1',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  // Section headers
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
    paddingLeft: 10,
    borderLeftWidth: 4,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  sectionCount: {
    fontSize: 13,
    fontWeight: '600',
  },

  // Game cards
  card: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  cover: {
    width: 140,
    height: 86,
    backgroundColor: '#334155',
  },
  info: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  gameName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  genre: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    fontSize: 13,
    color: '#FACC15',
    fontWeight: '600',
  },
  priceTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priceText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0F172A',
  },
});
