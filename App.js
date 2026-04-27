import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View,Pressable, TouchableOpacity, Alert, Image } from 'react-native';
import { girar, getAlerta } from "./src/logic/game";

// 1. Mapeamento das imagens (Ajuste os nomes dos arquivos conforme sua pasta assets)
const IMAGENS_SLOT = {
  'cherry': require('./assets/chuteira.png'),
  'seven': require('./assets/taça.png'),
  'diamond': require('./assets/icon.png'),
  'lemon': require('./assets/trionda.png'),
  'bell': require('./assets/apito.png'),
  'star': require('./assets/camisa.png'),
};

export default function App() {
  const [saldo, setSaldo] = useState(100);
  const [resultadoTexto, setResultadoTexto] = useState("Boa sorte!");
  const [rodando, setRodando] = useState(false);

  // Usamos as chaves do objeto IMAGENS_SLOT em vez de emojis
  const simbolos = Object.keys(IMAGENS_SLOT);

  const [grade, setGrade] = useState([
    ["cherry", "seven", "diamond"],
    ["lemon", "bell", "star"],
    ["cherry", "diamond", "seven"]
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
        setGrade([
          gerarFileiraAleatoria(),
          ["diamond", "diamond", "diamond"],
          gerarFileiraAleatoria()
        ]);
      } else {
        setResultadoTexto("Tente novamente! ❌");
        setGrade([
          gerarFileiraAleatoria(),
          [simbolos[0], simbolos[1], simbolos[2]], // Exemplo de perda
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
        <Image
          source={require('./assets/logo.png')}
          style={styles.logoImage}
        />

        <View style={styles.statusPanel}>
          <Text style={styles.saldoText}>Saldo: R$ {saldo}</Text>
          <Text style={styles.feedbackText}>{resultadoTexto}</Text>
        </View>

        <View style={styles.slotContainer}>
          {grade.map((fileira, i) => (
            <View key={i} style={styles.reelsContainer}>
              {fileira.map((nomeImagem, j) => (
                <View key={j} style={[styles.reel, rodando && styles.reelSpinning]}>
                  {/* 2. Substituindo o Text pela Image */}
                  <Image
                    source={IMAGENS_SLOT[nomeImagem]}
                    style={styles.slotImage}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>

        <Pressable
          style={[styles.button, rodando && styles.buttonDisabled]}
          onPress={lidarComGiro}
          disabled={rodando}
        >
          <Text style={styles.buttonText}>{rodando ? "SORTEANDO..." : "GIRE"}</Text>
        </Pressable>

      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  background: {
    flex: 1, alignItems: 'center',
    justifyContent:
      'center',
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20
  },
  statusPanel: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    width: '85%',
    borderWidth: 1,
    borderColor: '#FFD700'
  },
  saldoText: {
    color: '#00FF00',
    fontSize: 28,
    fontWeight: 'bold'
  },
  feedbackText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 5
  },
  slotContainer: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: '#FFD700'
  },
  reelsContainer: {
    flexDirection:
      'row',
    marginVertical: 3
  },
  reel: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#bbb'
  },
  reelSpinning: {
    opacity: 0.7,
    borderColor: '#FFD700'
  },
  // 3. Novo estilo para a imagem do slot
  logoImage: {
    width: 275,
    height: 275,
  },
  slotImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff'
  },

  buttonDisabled: {
    backgroundColor: '#444',
    borderColor: '#888'
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  },
});