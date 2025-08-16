import 'react-native-gesture-handler';
import React, { useState } from "react";
import {
  SafeAreaView, View, Text, TextInput, Image,
  TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Bienvenido</Text>
        <Image style={styles.image}
          source={{ uri: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1080" }}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate("Dividir")}>
          <Text style={styles.primaryBtnText}>Acceder</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function DivideScreen() {
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [resultado, setResultado] = useState("");

  const dividir = () => {
    if (n1.trim() === "" || n2.trim() === "") { setResultado("Ingresa ambos números."); return; }
    const a = Number(n1.replace(",", ".")); const b = Number(n2.replace(",", "."));
    if (Number.isNaN(a) || Number.isNaN(b)) { setResultado("Valores no válidos. Solo números."); return; }
    if (a === 0 && b === 0) { setResultado("INDETERMINACIÓN (0/0)"); return; }
    if (b === 0) { setResultado("NO EXISTE DIVISIÓN PARA CERO"); return; }
    const r = a / b;
    const pretty = Number.isInteger(r) ? String(r) : r.toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
    setResultado(`Resultado: ${pretty}`);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.card}>
        <Text style={styles.title}>Dividir</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Campo número 1</Text>
          <TextInput style={styles.input} placeholder="Ej: 4" keyboardType="decimal-pad" value={n1} onChangeText={setN1} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Campo número 2</Text>
          <TextInput style={styles.input} placeholder="Ej: 2" keyboardType="decimal-pad" value={n2} onChangeText={setN2} />
        </View>
        <TouchableOpacity style={styles.primaryBtn} onPress={dividir}>
          <Text style={styles.primaryBtnText}>Dividir</Text>
        </TouchableOpacity>
        <Text style={styles.result}>{resultado}</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dividir" component={DivideScreen} options={{ title: "Screen 2" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7fb", alignItems: "center", justifyContent: "center", padding: 16 },
  card: { width: "100%", maxWidth: 420, backgroundColor: "#fff", borderRadius: 16, padding: 20,
          shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 16, textAlign: "center" },
  image: { width: "100%", height: 180, borderRadius: 12, marginBottom: 20 },
  field: { marginBottom: 12 }, label: { fontSize: 14, marginBottom: 6, color: "#333" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, backgroundColor: "#fafafa" },
  primaryBtn: { backgroundColor: "#2e6ef7", paddingVertical: 12, borderRadius: 12, alignItems: "center", marginTop: 8 },
  primaryBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  result: { marginTop: 16, fontSize: 16, textAlign: "center", fontWeight: "600" },
});
