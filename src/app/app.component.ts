import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'password_generator';
  passwordGenerated: string = "";
  includeLetters: boolean = false;
  includeNumbers: boolean = false;
  includeSymbols: boolean = false;
  passwordLength: number = 0;
  isDisabled: boolean = true;

  disableEnableButton(){
    const includeVarsLength = [this.includeLetters, this.includeNumbers, this.includeSymbols].filter(Boolean).length;
    if ((this.passwordLength) > 0 && (this.passwordLength >= includeVarsLength) && (includeVarsLength > 0)){ 
      this.isDisabled = false;
    }else{
      this.isDisabled = true;
    }
  }
  onChangeLength(event: any){
    const inputElement = event.target as HTMLInputElement;
    const parsedLength = parseInt(inputElement.value);
    if (!isNaN(parsedLength)){
      this.passwordLength = parsedLength;
    }else{
      this.passwordLength = 0;
    }
    this.disableEnableButton();
  }
  onChangeLetters(){
    this.includeLetters = !this.includeLetters;
    this.disableEnableButton();
  }
  onChangeNumbers(){
    this.includeNumbers = !this.includeNumbers;
    this.disableEnableButton();
  }

  onChangeSymbols(){
   this.includeSymbols = !this.includeSymbols;
   this.disableEnableButton();
  }

  submit(){
    const allNumbers = "0123456789";
    const allLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const allSymbols = "!@#$%^&*()_+";
    
    let password = "";
    let validChars: string = "";
    if (this.includeLetters){
      validChars += allLetters;
      password += allLetters[Math.floor(Math.random() * allLetters.length)];
    }

    if (this.includeNumbers){
      validChars += allNumbers;
      password += allNumbers[Math.floor(Math.random() * allNumbers.length)];
    }

    if (this.includeSymbols){
      validChars += allSymbols;
      password += allSymbols[Math.floor(Math.random() * allSymbols.length)];
    }

    for (let i = password.length; i < this.passwordLength; i++){
      const randomIndex = Math.floor(Math.random() * validChars.length);
      password += validChars[randomIndex];
    }

    this.passwordGenerated =  password;
  }
}
