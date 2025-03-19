import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SurveyComponent } from './components/survey/survey.component';

export const routes: Routes = [
  {
    path: 'survey/:userId', component: SurveyComponent
  }
];
