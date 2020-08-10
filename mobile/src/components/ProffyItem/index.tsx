import React, { useState } from "react";
import { View, Text, Image, Linking } from "react-native";
import styles from "./styles";
import { RectButton } from "react-native-gesture-handler";
import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../services/api";

export interface Proffy {
  id: number;
  subject: string;
  cost: number;
  user_id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface ProffyItemProps {
  proffy: Proffy;
  favorited: boolean;
}

const ProffyItem: React.FC<ProffyItemProps> = ({ proffy, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  const handleLinkToWhatsapp = async () => {
    api.post("/connections", { user_id: proffy.id });
    Linking.openURL(`whatsapp://send?phone=${proffy.whatsapp}`);
  };

  const handleToggleFavorited = async () => {
    const favorites = await AsyncStorage.getItem("favorites");
    let favoritesArray = [];
    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (!isFavorited) {
      favoritesArray.push(proffy);
      await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
      setIsFavorited(true);
    } else {
      const newFavorites = favoritesArray.filter(
        (favorite: Proffy) => favorite.id !== proffy.id
      );
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
      setIsFavorited(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: proffy.avatar }} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subject}>{proffy.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{proffy.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora <Text style={styles.priceValue}>R$ {proffy.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[styles.favoriteButton, isFavorited && styles.favorited]}
            onPress={handleToggleFavorited}
          >
            <Image
              source={(isFavorited && unfavoriteIcon) || heartOutlineIcon}
            />
          </RectButton>
          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsapp}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default ProffyItem;
