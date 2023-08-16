import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GeneratorComponent } from './pages/generator/generator.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { YourCodeComponent } from './components/your-code/your-code.component';
import { GeneratorLiveComponent } from './components/generator-live/generator-live.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'generator', component: GeneratorComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    YourCodeComponent,
    GeneratorLiveComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes,
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
