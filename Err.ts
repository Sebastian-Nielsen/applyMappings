export class Err {
	public message: string;
	constructor(message?: string) {
		this.message = message ?? "Error";
	}
	toString() {
		return this.message;
	}
}
