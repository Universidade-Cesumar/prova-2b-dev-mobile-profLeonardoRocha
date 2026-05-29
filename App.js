import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [materiais, setMateriais] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Almoxarifado - Enfermagem</Text>

      {/* Sprint 1: Componentes Estruturais */}
      <TextInput 
        testID="input-nome" 
        style={styles.input}
        placeholder="Nome do Material"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput 
        testID="input-quantidade" 
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <TouchableOpacity testID="btn-cadastrar" style={styles.button}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cadastrar</Text>
      </TouchableOpacity>
      
      <FlatList 
        testID="lista-materials"
        data={materiais}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.nome}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  button: { backgroundColor: '#007bff', padding: 15, alignItems: 'center', borderRadius: 5 }
});