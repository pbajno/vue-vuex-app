<template>
  <b-container fluid>
    
    <!-- User Interface controls -->
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      stacked="md"
      :items="users"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      @filtered="onFiltered"
    >
    <template slot="avatar" slot-scope="row">
        <b-img v-bind="imgOptions" rounded="circle" :src="row.value"></b-img>
      </template>

      <template slot="name" slot-scope="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template slot="isActive" slot-scope="row">
        {{ row.value ? 'Yes :)' : 'No :(' }}
      </template>

      <template slot="id" slot-scope="row">
        <b-button size="sm" :to="`/edituser/${row.value}`">
          Edit
        </b-button>
      </template>

      <template slot="row-details">
        <b-card>
          <b-row class="my-1" v-for="input in inputs" :key="input.name">
            <b-col sm="3">
              <label :for="`type-${input.name}`">{{ input.label }}:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input :placeholder="input.placeholder"  :id="`type-${input.name}`" :type="input.type"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="9">
              <b-button type="submit" variant="primary">Submit</b-button>
            </b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {

  data() {
    return {
      inputs: [
        {'label': 'First name', 'name': 'first_name', 'type':'text', 'placeholder': 'Type your first name'},
        {'label': 'Last name', 'name': 'last_name', 'type':'text', 'placeholder': 'Type your last name'},
        {'label': 'Avatar URI', 'name': 'avatar', 'type':'text', 'placeholder': 'What is your avatar address?'}
      ],
      imgOptions: { width: 50, height: 50, class: 'm1' },
      fields: [
        { key: 'avatar', label: '' },
        { key: 'name', label: 'Full name', sortable: false},
        { key: 'id', label: 'Actions' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      filter: null
    }
  },
  computed: {
    ...mapState([
      'users'
    ]),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  updated() {
    console.log(this.users);
    this.totalRows = this.users.length;
  },
  mounted() {
    this.$store.dispatch('loadUsers');
    this.totalRows = this.users.length;
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
}
</script>