import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  ScrollView,
  TextInput,
  BorderlessButton,
  RectButton,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles";
import PageHeader from "../../components/PageHeader";
import ProffyItem from "../../components/ProffyItem";
import { Proffy } from "../../components/ProffyItem";
import api from "../../services/api";

interface TextInputWithFocus extends TextInput {
  focus: Function;
}

const TeacherList = () => {
  const [areFiltersVisible, setAreFiltersVisible] = useState(false);
  const [proffys, setProffys] = useState([]);
  const [subject, setSubject] = useState("");
  const [week_day, setWeekday] = useState("");
  const [time, setTime] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const subjectInputRef = React.createRef<TextInputWithFocus>();
  const weekdayInputRef = React.createRef<TextInputWithFocus>();
  const timeInputRef = React.createRef<TextInputWithFocus>();

  async function getFavoriteProffys() {
    const response = await AsyncStorage.getItem("favorites");
    if (response) {
      const favoritedTeachers = JSON.parse(response);
      const favoritedTeachersIds: number[] = favoritedTeachers.map(
        (teacher: Proffy) => teacher.id
      );
      setFavorites(favoritedTeachersIds);
    }
  }

  const toggleFiltersVisibility = () => {
    setAreFiltersVisible(!areFiltersVisible);
  };

  const handleFiltersSubmit = async () => {
    const response = await api.get("/classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setAreFiltersVisible(false);
    getFavoriteProffys();
    setProffys(response.data);
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title={"Proffys disponíveis"}
        headerRight={
          <BorderlessButton onPress={toggleFiltersVisibility}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {areFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              value={subject}
              ref={subjectInputRef}
              onTouchEnd={() => subjectInputRef.current?.focus()}
              onSubmitEditing={() => weekdayInputRef.current?.focus()}
              onChangeText={(text) => setSubject(text)}
              placeholderTextColor="#c1bccc"
              style={styles.input}
              placeholder="Qual a matéria?"
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  value={week_day}
                  ref={weekdayInputRef}
                  onTouchEnd={() => weekdayInputRef.current?.focus()}
                  onSubmitEditing={() => timeInputRef.current?.focus()}
                  onChangeText={(text) => setWeekday(text)}
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual o dia?"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  value={time}
                  ref={timeInputRef}
                  onTouchEnd={() => timeInputRef.current?.focus()}
                  onChangeText={(text) => setTime(text)}
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Que horas?"
                />
              </View>
            </View>
            <RectButton
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Buscar Professores</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {proffys.map((proffy: Proffy) => (
          <ProffyItem
            key={proffy.id}
            proffy={proffy}
            favorited={favorites.includes(proffy.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
