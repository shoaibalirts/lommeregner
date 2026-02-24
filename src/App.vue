<template>
  <main>
    <TheCalculator />
  </main>
</template>
<script>
import TheCalculator from "./components/TheCalculator.vue";

export default {
  data() {
    return {
      number1: 2,
      number2: 4,
    };
  },
  components: {
    TheCalculator,
  },
};
</script>
