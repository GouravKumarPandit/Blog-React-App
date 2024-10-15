import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";

class AuthService{
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // Use for SIGNUP
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                /* Calling login function so that if user is successfully logged-in than we directly logged-in and will open the home page */
                return this.login(email, password);
            } else{
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite >> auth >> AuthService :: createAccount :: ERROR ", error);
            return false;
        }
    }

    // Use for LOGIN
    async login(email, password){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("Appwrite >> auth >> AuthService :: login :: ERROR ", error);
            return false;
        }
    }

    // Use for getting the LOGGED-IN USER DATA
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite >> auth >> AuthService :: getCurrentUser :: ERROR ", error);
            return false;
        }
    }

    // Use for LOGOUT
    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite >> auth >> AuthService :: logout :: ERROR ", error);
            return false;
        }
    }
}

const authService = new AuthService();

export default authService;