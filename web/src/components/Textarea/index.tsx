import React, { TextareaHTMLAttributes } from "react";
import "./styles.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}
const Textarea: React.FC<TextareaProps> = ({ name, label, ...attrs }) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...attrs} />
    </div>
  );
};

export default Textarea;
