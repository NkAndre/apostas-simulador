import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { girar, getAlerta } from "./src/logic/game";

export default function App() {
  const [saldo, setSaldo] = useState(100);
  const [resultadoTexto, setResultadoTexto] = useState("Boa sorte!");
  const [rodando, setRodando] = useState(false);
  
  const simbolos = ["🍒", "7️⃣", "💎", "🍋", "🔔", "⭐"];
  
  // Agora temos 3 arrays, um para cada fileira
  const [grade, setGrade] = useState([
    ["🍒", "7️⃣", "💎"],
    ["🍋", "🔔", "⭐"],
    ["🍒", "💎", "7️⃣"]
  ]);

  const gerarFileiraAleatoria = () => [
    simbolos[Math.floor(Math.random() * simbolos.length)],
    simbolos[Math.floor(Math.random() * simbolos.length)],
    simbolos[Math.floor(Math.random() * simbolos.length)]
  ];

  const lidarComGiro = () => {
    if (rodando) return;

    setRodando(true);
    setResultadoTexto("Girando...");

    let intervalo = setInterval(() => {
      setGrade([
        gerarFileiraAleatoria(),
        gerarFileiraAleatoria(),
        gerarFileiraAleatoria()
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(intervalo);
      const resultado = girar();
      
      setSaldo(resultado.saldo);
      setRodando(false);

      if (resultado.resultado === "ganhou") {
        setResultadoTexto("VOCÊ GANHOU! 🎉");
        // Linha do meio com símbolos iguais para feedback visual
        setGrade([
          gerarFileiraAleatoria(),
          ["💎", "💎", "💎"], 
          gerarFileiraAleatoria()
        ]);
      } else {
        setResultadoTexto("Tente novamente! ❌");
        setGrade([
          gerarFileiraAleatoria(),
          ["🍒", "🍋", "🔔"],
          gerarFileiraAleatoria()
        ]);
      }

      const alerta = getAlerta();
      if (alerta) Alert.alert("Aviso importante", alerta);
    }, 1500); 
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('./assets/background1.png')} 
        resizeMode="cover" 
        style={styles.background}
      >
        <Text style={styles.title}>LUCKY SLOT</Text>

        <View style={styles.statusPanel}>
          <Text style={styles.saldoText}>Saldo: R$ {saldo}</Text>
          <Text style={styles.feedbackText}>{resultadoTexto}</Text>
        </View>

        <View style={styles.slotContainer}>
          {/* Mapeia as 3 fileiras */}
          {grade.map((fileira, i) => (
            <View key={i} style={styles.reelsContainer}>
              {fileira.map((simbolo, j) => (
                <View key={j} style={[styles.reel, rodando && styles.reelSpinning]}>
                  <Text style={styles.symbol}>{simbolo}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.button, rodando && styles.buttonDisabled]} 
          onPress={lidarComGiro}
          disabled={rodando}
        >
          <Text style={styles.buttonText}>{rodando ? "SORTEANDO..." : "SPIN"}</Text>
        </TouchableOpacity>

      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  background: { flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' },
  title: { fontSize: 42, fontWeight: 'bold', color: '#FFD700', marginBottom: 20 },
  statusPanel: { backgroundColor: 'rgba(0,0,0,0.7)', padding: 15, borderRadius: 12, marginBottom: 20, alignItems: 'center', width: '85%', borderWidth: 1, borderColor: '#FFD700' },
  saldoText: { color: '#00FF00', fontSize: 28, fontWeight: 'bold' },
  feedbackText: { color: '#fff', fontSize: 18, marginTop: 5 },
  slotContainer: { backgroundColor: '#333', padding: 10, borderRadius: 15, borderWidth: 5, borderColor: '#FFD700' },
  reelsContainer: { flexDirection: 'row', marginVertical: 3 }, // Espaçamento entre as fileiras
  reel: { width: 75, height: 75, backgroundColor: '#fff', marginHorizontal: 3, alignItems: 'center', justifyContent: 'center', borderRadius: 8, borderWidth: 2, borderColor: '#bbb' },
  reelSpinning: { opacity: 0.7, borderColor: '#FFD700' },
  symbol: { fontSize: 40 },
  button: { marginTop: 30, backgroundColor: '#FF0000', paddingVertical: 15, paddingHorizontal: 50, borderRadius: 50, borderWidth: 3, borderColor: '#fff' },
  buttonDisabled: { backgroundColor: '#444', borderColor: '#888' },
  buttonText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
});