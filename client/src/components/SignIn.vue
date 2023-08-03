<template>
    <div>
      <v-app>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
              <v-card class="signin-card">
                <v-card-title class="headline">Sign In</v-card-title>
                <v-card-text>
                  <v-form @submit.prevent="submitForm">
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
                    <v-btn color="primary" type="submit" class="button">Sign In</v-btn>
                  </v-form>
                  <div v-if="error" class="error-message">{{ error }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-app>
    </div>
  </template>
    
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SignIn',
    data() {
      return {
        email: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async submitForm() {
        try {
          this.error = null;
          const requestBody = {
            email: this.email,
            password: this.password,
          };
          const response = await axios.post('http://localhost:8080/api/v1/signin', requestBody);
        } catch (error) {
          console.error('Error sending data:', error.response.data.message);
          this.error = error.response.data.message;
        }
      },
    },
  };
  </script>
    
  <style scoped>
  .signin-card {
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
  