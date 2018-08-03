import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormGroup,FormControl,FormBuilder,FormArray,Validators} from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
user={
  perferences:{

  }
}

userFG:FormGroup;
  constructor(public navCtrl: NavController,private fb:FormBuilder) {
  
    this.userFG = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      preferences: new FormGroup({
        skills: new FormControl(),
        skills2: new FormControl('My Awesome Notes')
      })
    })
    this.userFG = this.fb.group({
     
      name:['',[Validators.required,Validators.minLength(2)]],
      username:['',[Validators.required,Validators.minLength(6),Validators.maxLength(8)]],
      password:['',[Validators.required,Validators.maxLength(6),Validators.minLength(5),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')]],
     
      AddingSkillsList:this.fb.array([
        this.AddSkillsFields()
      ])
    })
  }
  submit() {
    console.log(this.user); 
  }
  formSubmit({value,valid}:{value:User,valid:boolean}) {
    console.log(value);
    console.log(valid);
   
  }
  AddSkillsFields() : FormGroup
{
    return this.fb.group({
    SkillsName : ['',Validators.compose([Validators.required])],
   
    Sc: ['',Validators.compose([Validators.required,Validators.maxLength(1), Validators.pattern('[0-5]*')])],    
 });
}
 

InputNewField(): void
{
 const con = <FormArray>this.userFG.controls.AddingSkillsList;
  con.push(this.AddSkillsFields());
}

RemoveField(x : number) : void
{
 const con= <FormArray>this.userFG.controls.AddingSkillsList;
 con.removeAt(x);
}
manage(val : any) : void
{
 console.dir(val);
}

getSkill(){

 this.AddSkillsFields();
 this.InputNewField();

}
}

export interface User{
  username:string;
  name:string;
  password:string;
  preferences:{
    skills:string,
    skills2:string
  }
}