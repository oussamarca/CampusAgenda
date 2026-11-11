
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';


// 1. Type Evenement
// =====================================

type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};



const evenements: Evenement[] = [
  { id: 'E01', titre: 'Atelier React', categorie: 'Atelier', capacite: 25, inscrits: 25 },
  { id: 'E02', titre: 'Conférence IA', categorie: 'Conférence', capacite: 70, inscrits: 52 },
  { id: 'E03', titre: 'Sécurité mobile', categorie: 'Atelier', capacite: 20, inscrits: 17},
  { id: 'E04', titre: 'Design UI', categorie: 'Atelier', capacite: 18, inscrits: 9 },
  { id: 'E05', titre: 'Forum projets', categorie: 'Rencontre', capacite: 50, inscrits: 49 },
  { id: 'E06', titre: 'Découverte Git', categorie: 'Atelier', capacite: 24, inscrits: 24 }
];



function placesRestantes(e: Evenement): number {
  return Math.max(0, e.capacite - e.inscrits);
}



function statutEvenement(e: Evenement): string {
  const places = placesRestantes(e);

  if (places === 0) {
    return 'Complet';
  } else if (places <= 3) {
    return 'Presque complet';
  } else {
    return 'Ouvert';
  }
}



const totalEvenements = evenements.length;

const evenementsComplets = evenements.filter(
  (e) => placesRestantes(e) === 0
).length;

const evenementsAvecPlaces = evenements.filter(
  (e) => placesRestantes(e) > 0
).length;

const totalPlacesRestantes = evenements.reduce(
  (total, e) => total + placesRestantes(e),
  0
);

const ateliersDisponibles = evenements.filter(
  (e) =>
    e.categorie === 'Atelier' &&
    placesRestantes(e) > 0
);



type BadgeEtatProps = {
  statut: string;
};

function BadgeEtat({ statut }: BadgeEtatProps) {
  let couleur = 'green';

  if (statut === 'Complet') {
    couleur = 'red';
  } else if (statut === 'Presque complet') {
    couleur = 'orange';
  }

  return (
    <Text style={{ color: couleur, fontWeight: 'bold' }}>
      {statut}
    </Text>
  );
}



type CarteEvenementProps = {
  evenement: Evenement;
};

function CarteEvenement({ evenement }: CarteEvenementProps) {
  return (
    <View style={styles.carte}>
      <Text style={styles.titreCarte}>
        {evenement.titre}
      </Text>

      <Text>{evenement.categorie}</Text>

      <Text>
        Places restantes : {placesRestantes(evenement)}
      </Text>

      <BadgeEtat statut={statutEvenement(evenement)} />
    </View>
  );
}



type BlocStatistiqueProps = {
  label: string;
  valeur: number;
};

function BlocStatistique({ label, valeur }: BlocStatistiqueProps) {
  return (
    <View style={styles.statistique}>
      <Text>{label}</Text>
      <Text style={styles.valeurStatistique}>
        {valeur}
      </Text>
    </View>
  );
}



function filtrerEvenements(mode: 'tous' | 'ateliers') {
  return mode === 'ateliers'
    ? ateliersDisponibles
    : evenements;
}

const evenementsFiltres = filtrerEvenements('tous');


export default function App() {
  return (
    <View style={styles.container}>

      <Text style={styles.titre}>
        CampusAgenda
      </Text>

      <BlocStatistique
  label="Événements complets"
  valeur={evenementsComplets}
/>

<BlocStatistique
  label="Événements avec places"
  valeur={evenementsAvecPlaces}
/>

<BlocStatistique
  label="Places restantes"
  valeur={totalPlacesRestantes}
/>

<BlocStatistique
  label="Ateliers disponibles"
  valeur={ateliersDisponibles.length}
/>
<BlocStatistique
  label="Total événements"
  valeur={totalEvenements}
/>
<FlatList
  data={evenementsFiltres}
  renderItem={({ item }) => <CarteEvenement evenement={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
  <Text style={{ textAlign: 'center', marginTop: 20 }}>
    Aucun événement disponible.
  </Text>
}
/>
  </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f5f5f5'
  },

  titre: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },

  carte: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    width: '100%',
    elevation: 3
  },

  titreCarte: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },

  statistique: {
    backgroundColor: '#eeeeee',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10
  },

  valeurStatistique: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});
