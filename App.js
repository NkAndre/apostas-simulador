import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('./assets/background1.png')} 
        resizeMode="cover" 
        style={styles.background}
      >
        {/* Título do Jogo */}
        <Text style={styles.title}>LUCKY SLOT</Text>

        {/* Máquina Caça-Níquel */}
        <View style={styles.slotContainer}>
          <View style={styles.reelsContainer}>
            {/* Bobina 1 */}
            <View style={styles.reel}>
              <Text style={styles.symbol}>🍒</Text>
            </View>
            {/* Bobina 2 */}
            <View style={styles.reel}>
              <Text style={styles.symbol}>7️⃣</Text>
            </View>
            {/* Bobina 3 */}
            <View style={styles.reel}>
              <Text style={styles.symbol}>💎</Text>
            </View>
          </View>
          <View style={styles.reelsContainer}>
            {/* Bobina 1 */}
            <View style={styles.reel}>
              <Text style={styles.symbol}>🍒</Text>
            </View>
            {/* Bobina 2 */}
            <View style={styles.reel}>
              <Text style={styles.symbol}>7️⃣</Text>
            </View>
            {/* Bobina 3 */}
            <View style={styles.reel}>
              <Text style={styles.symbol}>💎</Text>
            </View>
          </View>
          <View style={styles.reelsContainer}>
            {/* Bobina 1 */}
            <View style={styles.reel}>
              <Text style={styles.symbol}>🍒</Text>
            </View>
            {/* Bobina 2 */}
            <View style={styles.reel}>
              <Text style={styles.symbol}>7️⃣</Text>
            </View>
            {/* Bobina 3 */}
            <View style={styles.reel}>
              <Text style={styles.symbol}>💎</Text>
            </View>
          </View>
        </View>

        {/* Botão de Jogar */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SPIN</Text>
        </TouchableOpacity>

      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  slotContainer: {
    backgroundColor: '#444',
    height: 400,
    padding: 15,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: '#FFD700',
  },
  reelsContainer: {
    flexDirection: 'row', // Coloca as bobinas lado a lado
  },
  reel: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  symbol: {
    fontSize: 50,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});