<template>
    <v-app>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card class="signup-card">
              <v-card-title class="headline">Sign Up</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submitForm">
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="firstName"
                        label="First Name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="lastName"
                        label="Last Name"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    required
                    type="email"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    required
                    type="password"
                  ></v-text-field>
                  <v-btn color="primary" type="submit" class="button">Sign Up</v-btn>
                </v-form>
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'App',
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async submitForm() {
        this.errorMessage = '';
        try {
          const requestBody = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
          };

          const response = await axios.post('http://localhost:8080/api/v1/signup', requestBody);
  
        } catch (error) {
          console.error('Error sending data:', error.response.data.message);
          this.errorMessage = error.response.data.message; 
        }
      },
    },
  };
  </script>
  
  <style>
  .signup-card {
    margin-top: 100px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .button {
    margin: auto;
    display: flex;
  }
  
  .headline {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 16px;
  }
  
  .error-message {
    color: red;
    text-align: center;
    margin-top: 10px;
  }
  </style>
  