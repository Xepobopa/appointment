export class userStub {
    email: string;
    photo_avatar: string;
    phone: string;
    name: string;
    type: string;

    constructor(email: string) {
        this.email = email
        this.photo_avatar = "http://a.png";
        this.phone = "+380972342758";
        this.name = "dima";
        this.type = "string";
    }

    get() {
        return {
            type: this.type,
            email: this.email,
            name: this.name,
            phone: this.phone,
            photo_avatar: this.photo_avatar,
        }
    }
}