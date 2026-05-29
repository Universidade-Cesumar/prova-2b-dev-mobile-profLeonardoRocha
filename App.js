import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

// Importação da Sprint 2
import { validarRetirada } from './src/utils/validacoes';

export default function App() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [busca, setBusca] = useState('');

  // Massa de dados inicial para a FlatList e busca funcionarem
  const [materiais, setMateriais] = useState([
    { id: '1', nome: 'Luva de Látex', quantidade: 50 },
    { id: '2', nome: 'Seringa Descartável', quantidade: 120 },
    { id: '3', nome: 'Avental Cirúrgico', quantidade: 30 },
  ]);

  // Sprint 3: Filtragem dinâmica baseada no input-busca
  const materiaisFiltrados = materiais.filter(item =>
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Sprint 3: Totalizadores calculados dinamicamente
  const totalItensDiferentes = materiaisFiltrados.length;
  const totalUnidades = materiaisFiltrados.reduce((acc, item) => acc + Number(item.quantidade), 0);

  // Lógica de cadastro simulada para manter consistência
  const handleCadastrar = () => {
    if (!nome || !quantidade) return;
    const novoMaterial = {
      id: Date.now().toString(),
      nome,
      quantidade: parseInt(quantidade, 10)
    };
    setMateriais([...materiais, novoMaterial]);
    setNome('');
    setQuantidade('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Almoxarifado - Enfermagem</Text>

      {/* SPRINT 1: Cadastro de Materiais */}
      <View style={styles.card}>
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
          placeholder="Quantidade Inicial"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />

        <TouchableOpacity testID="btn-cadastrar" style={styles.button} onPress={handleCadastrar}>
          <Text style={styles.buttonText}>Cadastrar Insumo</Text>
        </TouchableOpacity>
      </View>

      {/* SPRINT 3: Filtro de Busca Dinâmica */}
      <TextInput
        testID="input-busca"
        style={styles.inputBusca}
        placeholder="🔍 Buscar insumo (ex: Luva)..."
        value={busca}
        onChangeText={setBusca}
      />

      {/* SPRINT 3: Painel de Indicadores / Totalizadores */}
      <View style={styles.rowIndicadores}>

        {/* Card de Itens Diferentes */}
        <View style={styles.cardIndicador}>
          <Text style={styles.txtIndicador}>Tipos de Insumo</Text>
          <Text testID="total-itens" style={styles.numIndicador}>{totalItensDiferentes}</Text>
        </View>

        {/* Card de Total de Unidades */}
        <View style={styles.cardIndicador}>
          <Text style={styles.txtIndicador}>Total Unidades</Text>
          <Text testID="total-unidades" style={styles.numIndicador}>{totalUnidades}</Text>
        </View>

      </View>

      {/* SPRINT 1: Listagem dos Materiais */}
      <FlatList
        testID="lista-materials"
        data={materiaisFiltrados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemLista}>
            <Text style={styles.itemNome}>{item.nome}</Text>
            <Text style={styles.itemQtd}>Qtd: {item.quantidade}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#f5f5f7' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#1d1d1f' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20, elevation: 2 },
  input: { borderWidth: 1, borderColor: '#e5e5ea', padding: 12, marginBottom: 10, borderRadius: 8, backgroundColor: '#fff' },
  inputBusca: { borderWidth: 1, borderColor: '#007aff', padding: 12, marginBottom: 15, borderRadius: 8, backgroundColor: '#fff', fontSize: 16 },
  button: { backgroundColor: '#007aff', padding: 14, alignItems: 'center', borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  rowIndicadores: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  cardIndicador: { flex: 1, backgroundColor: '#fff', padding: 10, borderRadius: 8, marginRight: 5, marginLeft: 5, alignItems: 'center', elevation: 1 },
  txtIndicador: { fontSize: 12, color: '#8e8e93' },
  numIndicador: { fontSize: 20, fontWeight: 'bold', color: '#1d1d1f', marginTop: 4 },
  itemLista: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#fff', marginBottom: 8, borderRadius: 8, elevation: 1 },
  itemNome: { fontSize: 16, fontWeight: '500', color: '#1d1d1f' },
  itemQtd: { fontSize: 14, color: '#ff9500', fontWeight: 'bold' }
});