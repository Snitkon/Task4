export interface IUser {
	_id?: String;
	name: String;
	email: String;
	password: String;
	active: Boolean;
}

export interface IForm {
	name: string;
	email: string;
	password: string;
}
