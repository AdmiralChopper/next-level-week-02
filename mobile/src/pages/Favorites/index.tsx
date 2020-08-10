import React, { useState, useEffect } from "react";
import { View, AsyncStorage } from "react-native";
import styles from "./styles";
import PageHeader from "../../components/PageHeader";
import { ScrollView } from "react-native-gesture-handler";
import ProffyItem, { Proffy } from "../../components/ProffyItem";

const Favorites = () => {
  const [favoriteProffys, setFavoriteProffys] = useState([]);
  useEffect(() => {
    async function getFavoriteProffys() {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        const favoriteProffys = JSON.parse(favorites);
        setFavoriteProffys(favoriteProffys);
      }
    }

    getFavoriteProffys();
  }, []);
  return (
    <View style={styles.container}>
      <PageHeader title={"Meus proffys favoritos"} />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favoriteProffys.map((favoriteProffy: Proffy) => (
          <ProffyItem
            key={favoriteProffy.id}
            proffy={favoriteProffy}
            favorited={true}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;
