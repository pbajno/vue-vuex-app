<template>
    <div>
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
    </div>
</template>