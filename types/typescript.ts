import { ChangeEvent, FormEvent } from "react";

export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
export type IFormEvent = FormEvent<HTMLFormElement>;