export class User {
    constructor(
        private _token: string,
        private userId: string,
    ) {}
  username: string;
  bio: string;
  image: string;
}