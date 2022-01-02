<template>
<div>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/per hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested?Halla at me</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
      <p>{{ description }}</p>
    </base-card>
  </section>
  </div>
</template> 

<script>
import BaseBadge from '../../components/ui/BaseBadge.vue';
export default {
  components: { BaseBadge },
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    contactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    },
  },
  created() {
    this.selectedCoach = this.$store.getters['cochez/coaches'].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>