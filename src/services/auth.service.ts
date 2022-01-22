import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { LocalUser } from "../models/local.user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService{

    jwt: JwtHelperService = new JwtHelperService();

    constructor(public http: HttpClient, public storage: StorageService){
    }
 
    authenticate(creds: CredenciaisDTO){

       return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfullLogin(authorizationValue: string){
        let tok = authorizationValue.substring(7);
        let user: LocalUser = {
            token: tok,
            email: this.jwt.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}