import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { User, MapPin, Bell, Globe, LogOut } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

export default function SettingsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Ajustes</Text>

      <SettingItem icon={<User size={20} color={Colors.accent.dark} />} title="Editar perfil" onPress={() => {}} />
      <SettingItem
        icon={<MapPin size={20} color={Colors.accent.dark} />}
        title="Dirección"
        subtitle="Usada para mostrarte anuncios cercanos"
        onPress={() => {}}
      />
      <SettingItem icon={<Bell size={20} color={Colors.accent.dark} />} title="Notificaciones" onPress={() => {}} />
      <SettingItem icon={<Globe size={20} color={Colors.accent.dark} />} title="Idioma" subtitle="Español / Inglés" onPress={() => {}} />

      <View style={styles.divider} />

      <SettingItem
        icon={<LogOut size={20} color="#EF5350" />}
        title="Cerrar sesión"
        titleStyle={{ color: '#EF5350' }}
        onPress={() => {}}
      />
    </ScrollView>
  );
}

function SettingItem({ icon, title, subtitle, onPress, titleStyle = {} }: any) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.texts}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.spacing.lg,
    backgroundColor: Colors.neutral.white,
  },
  header: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: Colors.accent.dark,
    marginBottom: Layout.spacing.lg,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  icon: {
    marginRight: Layout.spacing.md,
  },
  texts: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.accent.dark,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: Colors.accent.light,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral.lightGray,
    marginVertical: Layout.spacing.md,
  },
});