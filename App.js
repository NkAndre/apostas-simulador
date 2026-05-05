import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native";
import { girar, getAlerta, adicionarDeposito } from "./src/logic/game";
import { Audio } from "expo-av";


const IMAGENS_SLOT = {
  chuteira: require("./assets/chuteira.png"),
  taca: require("./assets/taça.png"),
  canario: require("./assets/canario.png"),
  trionda: require("./assets/trionda.png"),
  apito: require("./assets/apito.png"),
  camisa: require("./assets/camisa.png"),
  vuvuzela: require("./assets/vuvuzela.png"),
  luva: require("./assets/luva.png"),
  cartao: require("./assets/cartao.png"),
};

export default function App() {
  const somRef = useRef(null);
  const [saldo, setSaldo] = useState(0);
  const [deposito, setDeposito] = useState(0);
  const [resultadoTexto, setResultadoTexto] = useState("Faça um depósito");
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [rodando, setRodando] = useState(false);

  const nomeUsuario = "andre";

  const simbolos = Object.keys(IMAGENS_SLOT);

  const [grade, setGrade] = useState([
    ["chuteira", "taca", "canario"],
    ["trionda", "apito", "camisa"],
    ["vuvuzela", "luva", "cartao"],
  ]);

  const gerarFileiraAleatoria = () => [
    simbolos[Math.floor(Math.random() * simbolos.length)],
    simbolos[Math.floor(Math.random() * simbolos.length)],
    simbolos[Math.floor(Math.random() * simbolos.length)],
  ];

  async function tocarSom() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/sound/slotMachine.mp3")
    );
  
    somRef.current = sound;
    await sound.playAsync();
  }

  async function tocarSomVitoria() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/sound/coinsWin.mp3")
    );
  
    await sound.playAsync();
  }

  async function tocarSomDerrota() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/sound/lose.mp3")
    );
  
    await sound.playAsync();
  }

  const lidarComGiro = () => {
    if (rodando || saldo <= 0) return;

    tocarSom();

    setRodando(true);

    let intervalo = setInterval(() => {
      setGrade([
        gerarFileiraAleatoria(),
        gerarFileiraAleatoria(),
        gerarFileiraAleatoria(),
      ]);
    }, 100);

    setTimeout(async() => {
      clearInterval(intervalo);

      if (somRef.current) {
        await somRef.current.setVolumeAsync(0.1); // baixa o volume rápido
      
        setTimeout(async () => {
          await somRef.current.stopAsync();
        }, 100); // corta depois de 0.1s
      }

      const resultado = girar();

      setSaldo(resultado.saldo);
      setRodando(false);

      if (resultado.resultado === "ganhou") {
        await tocarSomVitoria();
        setResultadoTexto("VOCÊ GANHOU!");

        const iconeVitoria = "taca";
        setGrade([
          gerarFileiraAleatoria(),
          [iconeVitoria, iconeVitoria, iconeVitoria],
          gerarFileiraAleatoria(),
        ]);
      } else if (resultado.resultado === "sem_saldo") {
        setResultadoTexto("Sem saldo!");
      } else {
        await tocarSomDerrota();
        setResultadoTexto("Tente novamente!");

        setGrade([
          gerarFileiraAleatoria(),
          ["chuteira", "apito", "camisa"],
          gerarFileiraAleatoria(),
        ]);
      }

      const alerta = getAlerta();
      if (alerta) setMensagemAlerta(alerta);
    }, 1500);
  };

  //depósito dinâmico
  const fazerDeposito = (valor) => {
    const res = adicionarDeposito(valor);
    setDeposito(res.deposito);
    setSaldo(res.saldo);
    setResultadoTexto(`Depósito de R$ ${valor} realizado`);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/background1.png")}
        resizeMode="cover"
        style={styles.background}
      >
        {/* TOPO */}
        <View style={styles.viewDados}>
          <Text style={styles.text}>Olá, {nomeUsuario}</Text>
          <Text style={styles.text}>Saldo: R$ {saldo}</Text>
        </View>

        <Image source={require("./assets/logo.png")} style={styles.logoImage} />

        <View style={styles.statusPanel}>
          <Text style={styles.saldoText}>R$ {saldo}</Text>
          <Text style={styles.feedbackText}>{resultadoTexto}</Text>

          {mensagemAlerta !== "" && (
            <Text style={styles.alertaText}>{mensagemAlerta}</Text>
          )}
        </View>

        {/* SLOTS */}
        <View style={styles.slotContainer}>
          {grade.map((fileira, i) => (
            <View key={i} style={styles.reelsContainer}>
              {fileira.map((nomeImagem, j) => (
                <View
                  key={j}
                  style={[styles.reel, rodando && styles.reelSpinning]}
                >
                  <Image
                    source={IMAGENS_SLOT[nomeImagem]}
                    style={styles.slotImage}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* 🔥 BOTÕES DE DEPÓSITO */}
        <View style={styles.depositContainer}>
          <Pressable
            style={styles.depositBtn}
            onPress={() => fazerDeposito(25)}
          >
            <Text style={styles.buttonText}>R$25</Text>
          </Pressable>

          <Pressable
            style={styles.depositBtn}
            onPress={() => fazerDeposito(50)}
          >
            <Text style={styles.buttonText}>R$50</Text>
          </Pressable>

          <Pressable
            style={styles.depositBtn}
            onPress={() => fazerDeposito(100)}
          >
            <Text style={styles.buttonText}>R$100</Text>
          </Pressable>
        </View>

        {/* GIRAR */}
        <Pressable
          style={[
            styles.button,
            (rodando || saldo <= 0) && styles.buttonDisabled,
          ]}
          onPress={lidarComGiro}
          disabled={rodando || saldo <= 0}
        >
          <Text style={styles.buttonText}>
            {rodando ? "GIRANDO..." : "GIRAR"}
          </Text>
        </Pressable>
      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },

  viewDados: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 75,
    
  },

  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 40,
  },

  logoImage: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },

  statusPanel: {
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
    width: "72%",
    borderWidth: 5,
    borderColor: "#FFD700",
  },

  saldoText: { color: "#00FF00", fontSize: 28, fontWeight: "bold" },

  feedbackText: { color: "#fff", fontSize: 18, marginTop: 5 },

  alertaText: {
    color: "#FFD700",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },

  slotContainer: {
    backgroundColor: "rgba(51,51,51,0.9)",
    padding: 10,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: "#FFD700",
  },

  reelsContainer: { flexDirection: "row", marginVertical: 3 },

  reel: {
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  reelSpinning: { opacity: 0.6 },

  slotImage: {
    width: "95%",
    height: "95%",
    resizeMode: "contain",
  },

  depositContainer: {
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
  },

  depositBtn: {
    backgroundColor: "#01d135",
    padding: 12,
    borderRadius: 10,
  },

  button: {
    marginBottom: 30,
    marginTop: 20,
    backgroundColor: "#01d135",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 50,
  },

  buttonDisabled: { backgroundColor: "#555" },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
