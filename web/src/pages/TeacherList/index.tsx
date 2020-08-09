import React, { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import { Proffy } from "../../components/TeacherItem";
import "./styles.css";
import ProffyItem from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";

const TeacherList = () => {
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");
  const [proffys, setProffys] = useState([]);

  const searchProffys = async (e: FormEvent) => {
    e.preventDefault();
    const response = await api.get("/classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setProffys(response.data);
  };
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Esses são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchProffys}>
          <Select
            required
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Biologia", label: "Biologia" },
              { value: "Ciências", label: "Ciências" },
              { value: "Educação Física", label: "Educação Física" },
              { value: "Física", label: "Física" },
              { value: "Geografia", label: "Geografia" },
              { value: "Matemática", label: "Matemática" },
              { value: "Português", label: "Português" },
              { value: "Química", label: "Química" },
            ]}
          />
          <Select
            required
            name="weekday"
            label="Dia da Semana"
            value={week_day}
            onChange={(e) => setWeekDay(e.target.value)}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            required
            name="time"
            label="Horário"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </PageHeader>

      <main>
        {proffys.map((proffy: Proffy) => (
          <ProffyItem key={proffy.id} info={proffy} />
        ))}
      </main>
    </div>
  );
};

export default TeacherList;
