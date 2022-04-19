import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Role } from '../../Models/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  roles: Role[] = [];
  public registerForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  register(){
    let fullName = this.registerForm.controls['fullName'].value;
    let email = this.registerForm.controls['email'].value;
    let password = this.registerForm.controls['password'].value;
    this.userService.register(fullName, email, password, this.roles.filter(x => x.isSelected)[0].role).subscribe((res: any) => {
      this.registerForm.controls["fullName"].setValue("");
      this.registerForm.controls["email"].setValue("");
      this.registerForm.controls["password"].setValue("");
      this.roles.forEach(x => x.isSelected = false);
      console.log(res);
    }, error => {
      console.log("error", error);
    });
  }

  getAllRoles(){
    this.userService.getAllRoles().subscribe(roles => {
      this.roles = roles;
    })
  }

  onRoleChange(rol: string){
    this.roles.forEach(x => {
      if(x.role == rol){
        x.isSelected = true;
      }else{
        x.isSelected = false;
      }
    })
  }

}
