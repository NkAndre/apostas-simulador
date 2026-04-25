import { View, Text, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { girar, getAlerta, reset } from "./src/logic/game";

export default function App() {
  const [saldo, setSaldo] = useState(100);
  const [msg, setMsg] = useState("");
  const [alerta, setAlerta] = useState("");

  const handleGirar = () => {
    const r = girar();

    setSaldo(r.saldo);
    setMsg(r.resultado === "ganhou" ? "Você ganhou!" : "Você perdeu!");

    const a = getAlerta();
    if (a) setAlerta(a);
  };

  const handleReset = () => {
    reset();
    setSaldo(100);
    setMsg("");
    setAlerta("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Apostas</Text>

      <Text style={styles.saldo}>Saldo: R$ {saldo}</Text>

      <Button title="Girar" onPress={handleGirar} />

      <Text
        style={[
          styles.resultado,
          msg.includes("ganhou") ? styles.ganhou : styles.perdeu
        ]}
      >
        {msg}
      </Text>

      {alerta !== "" && (
        <Text style={styles.alerta}>{alerta}</Text>
      )}

      <Button title="Resetar" onPress={handleReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold"
  },
  saldo: {
    fontSize: 18,
    marginBottom: 15
  },
  resultado: {
    marginTop: 15,
    fontSize: 18
  },
  ganhou: {
    color: "green"
  },
  perdeu: {
    color: "red"
  },
  alerta: {
    marginTop: 20,
    color: "red",
    textAlign: "center"
  }
});