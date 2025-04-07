export interface IUser {
  username: string;
  email: string;
  name: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ISignUp {
  username: string;
  email: string;
  password: string;
  name: string;
}

export interface ITodos {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  payload: string;
  date: string;
}

export interface ITodoEditValid {
  id: number;
  title: string;
  payload: string;
  date: string;
}

export interface ITodoEdit {
  title?: string;
  payload?: string;
  date?: string;
}

export interface IChangePassword {
  current_password: string;
  new_password: string;
}

export interface ICreateTodo {
  title: string;
  payload: string;
  date: string;
}
