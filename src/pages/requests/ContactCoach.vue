<template>
  <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <form @submit.prevent="contactForm">
    <div class="form-control" :class="{ errors: !email.isValid }">
      <label for="email">Your E-mail</label>
      <input
        type="email"
        id="email"
        v-model.trim="email.val"
        @blur="removeError('email')"
      />
      <p v-if="!email.isValid">E-mail must not be empty</p>
    </div>
    <div class="form-control" :class="{ errors: !message.isValid }">
      <label for="message">Message</label>
      <textarea
        id="message"
        rows="5"
        v-model.trim="message.val"
        @blur="removeError('message')"
      ></textarea>
      <p v-if="!message.isValid">Message must not be empty</p>
    </div>
    <p v-if="!formIsValid" class="errors">Please fix the above errors</p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      formIsValid: true,
      email: {
        val: '',
        isValid: true,
      },
      message: {
        val: '',
        isValid: true,
      },
    };
  },
  methods: {
    removeError(input) {
      this[input].isValid = true;
    },
    validateContactForm() {
      this.formIsValid = true;
      if (this.email.val === '' || !this.email.val.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.message.val === '') {
        this.message.isValid = false;
        this.formIsValid = false;
      }
    },
    async contactForm() {
      this.validateContactForm();
      if (!this.formIsValid) {
        return;
      }
      const contactMessage = {
        email: this.email.val,
        message: this.message.val,
        coachId: this.$route.params.id,
      };
      try {
        await this.$store.dispatch('requests/contactCoach', contactMessage);
        await this.$router.replace('/coaches');
      } catch (error) {
        this.error =
          error.message ||
          'Something went wrong Nigga.Check again later Nigga!!!';
      }
    },
    handleError() {
      this.error = null;
    },
  },
  
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>