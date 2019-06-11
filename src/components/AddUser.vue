<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-form @submit="onSubmit">
      <b-row>
            <b-card>
            <b-row class="my-1" v-for="input in inputs" :key="input.name">
                <b-col sm="3">
                <label :for="`type-${input.name}`">{{ input.label }}:</label>
                </b-col>
                <b-col sm="9">
                <b-form-input :placeholder="input.placeholder"  :id="`type-${input.name}`" :type="input.type" v-model="input.value"></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="9">
                    <b-button type="submit" variant="primary">Submit</b-button>
                </b-col>
            </b-row>
            <p>{{ result }}</p>
            </b-card>
        </b-row>
      </b-form>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      result: '',
      inputs: [
        {
            'label': 'First name',
            'name': 'first_name',
            'type':'text',
            'placeholder': 'Type your first name',
            'value': ''
        },
        {
            'label': 'Last name',
            'name': 'last_name',
            'type':'text',
            'placeholder': 'Type your last name',
            'value': ''
        },
        {
            'label': 'Avatar URI',
            'name': 'avatar',
            'type':'text',
            'placeholder': 'What is your avatar address?',
            'value': ''
        }
      ]
    }
  },
  methods: {
      async onSubmit(evt) {
        evt.preventDefault();
        let form = [];
        await this.inputs.forEach((item) => {
            if(item.name == 'first_name')
                form.first_name = item.value;
            if(item.name == 'last_name')
                form.last_name = item.value;
            if(item.name == 'avatar')
                form.avatar = item.value;
        });
        await this.$store.dispatch('newUser', form);
        this.result = "Data sent!";
      }
  }
}
</script>