import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class Cus {

  encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, environment.cryptoKey).toString();
  }

  decrypt(text: string): string {
    const bytes = CryptoJS.AES.decrypt(text, environment.cryptoKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

}
