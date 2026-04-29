import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { girar, getAlerta } from "./src/logic/game";

const IMAGENS_SLOT = {
  'chuteira': require('./assets/chuteira.png'),
  'taca': require('./assets/taça.png'),
  'canario': require('./assets/canario.png'),
  'trionda': require('./assets/trionda.png'),
  'apito': require('./assets/apito.png'),
  'camisa': require('./assets/camisa.png'),
};

export default function App() {
  const [saldo, setSaldo] = useState(100);
  const [resultadoTexto, setResultadoTexto] = useState("Boa sorte!");
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [rodando, setRodando] = useState(false);

  const simbolos = Object.keys(IMAGENS_SLOT);

  const [grade, setGrade] = useState([
    ["chuteira", "taca", "canario"],
    ["trionda", "apito", "camisa"],
    ["chuteira", "canario", "taca"]
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
    setMensagemAlerta("");

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

        const iconeVitoria = "taca";
        setGrade([
          gerarFileiraAleatoria(),
          [iconeVitoria, iconeVitoria, iconeVitoria],
          gerarFileiraAleatoria()
        ]);
      } else {
        setResultadoTexto("Tente novamente! ❌");

        setGrade([
          gerarFileiraAleatoria(),
          ["chuteira", "apito", "camisa"],
          gerarFileiraAleatoria()
        ]);
      }

      const alerta = getAlerta();
      if (alerta) {
        setMensagemAlerta(alerta);
      }
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

          {mensagemAlerta !== "" && (
            <Text style={styles.alertaText}>{mensagemAlerta}</Text>
          )}
        </View>

        <View style={styles.slotContainer}>
          {grade.map((fileira, i) => (
            <View key={i} style={styles.reelsContainer}>
              {fileira.map((nomeImagem, j) => (
                <View key={j} style={[styles.reel, rodando && styles.reelSpinning]}>
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
          <Text style={styles.buttonText}>
            {rodando ? "GIRANDO..." : "GIRE"}
          </Text>
        </Pressable>

      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  background: { flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' },
  logoImage: { width: 250, height: 150, resizeMode: 'contain', marginBottom: 10 },

  statusPanel: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    width: '85%',
    borderWidth: 2,
    borderColor: '#FFD700'
  },

  saldoText: { color: '#00FF00', fontSize: 28, fontWeight: 'bold' },
  feedbackText: { color: '#fff', fontSize: 18, marginTop: 5, fontWeight: '500' },

  alertaText: {
    color: '#FFD700',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center'
  },

  slotContainer: {
    backgroundColor: 'rgba(51, 51, 51, 0.9)',
    padding: 10,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: '#FFD700'
  },

  reelsContainer: { flexDirection: 'row', marginVertical: 3 },

  reel: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd'
  },

  reelSpinning: { opacity: 0.6, borderColor: '#FFD700' },

  slotImage: { width: 75, height: 75, resizeMode: 'contain' },

  button: {
    marginTop: 30,
    backgroundColor: '#01d135ff',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    elevation: 5
  },

  buttonDisabled: { backgroundColor: '#555', borderColor: '#888' },

  buttonText: { color: '#ffffffff', fontSize: 24, fontWeight: 'bold' },
});