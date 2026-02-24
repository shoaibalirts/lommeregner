<template>
  <v-app theme="dark">
    <v-main class="bg-grey-lighten-2 d-flex align-center justify-center">
      <v-card
        width="340"
        elevation="15"
        class="rounded-xl pa-4 bg-grey-darken-4"
      >
        <v-sheet
          height="100"
          class="d-flex align-end justify-end pa-4 mb-4 rounded-lg bg-black"
        >
          <div class="text-h3 font-weight-light white overflow-hidden">
            {{ current || "0" }}
          </div>
        </v-sheet>

        <v-row no-gutters>
          <v-col cols="3" class="pa-1"
            ><v-btn block size="x-large" color="white" @click="append('7')"
              >7</v-btn
            ></v-col
          >
          <v-col cols="3" class="pa-1"
            ><v-btn block size="x-large" color="white" @click="append('8')"
              >8</v-btn
            ></v-col
          >
          <v-col cols="3" class="pa-1"
            ><v-btn block size="x-large" color="white" @click="append('9')"
              >9</v-btn
            ></v-col
          >
          <v-col cols="3" class="pa-1">
            <v-btn
              block
              size="x-large"
              color="orange-darken-2"
              @click="setOperator('/')"
            >
              ÷
            </v-btn>
          </v-col>

          <v-col cols="3" class="pa-1"
            ><v-btn block size="x-large" color="white" @click="append('4')"
              >4</v-btn
            ></v-col
          >
          <v-col cols="3" class="pa-1"
            ><v-btn block size="x-large" color="white" @click="append('5')"
              >5</v-btn
            ></v-col
          >
          <v-col cols="3" class="pa-1"
            ><v-btn block size="x-large" color="white" @click="append('6')"
              >6</v-btn
            ></v-col
          >
          <v-col cols="3" class="pa-1">
            <v-btn
              block
              size="x-large"
              color="orange-darken-2"
              @click="setOperator('*')"
              >×</v-btn
            >
          </v-col>

          <v-col cols="3" class="pa-1"
            ><v-btn block size="x-large" color="white" @click="append('1')"
              >1</v-btn
            ></v-col
          >
          <v-col cols="3" class="pa-1"
            ><v-btn block size="x-large" color="white" @click="append('2')"
              >2</v-btn
            ></v-col
          >
          <v-col cols="3" class="pa-1"
            ><v-btn block size="x-large" color="white" @click="append('3')"
              >3</v-btn
            ></v-col
          >
          <v-col cols="3" class="pa-1">
            <v-btn
              block
              size="x-large"
              color="orange-darken-2"
              @click="setOperator('-')"
              >-</v-btn
            >
          </v-col>

          <v-col cols="9" class="pa-1">
            <v-btn block size="x-large" color="white" @click="append('0')"
              >0</v-btn
            >
          </v-col>
          <v-col cols="3" class="pa-1">
            <v-btn
              block
              size="x-large"
              color="orange-darken-2"
              @click="setOperator('+')"
              >+</v-btn
            >
          </v-col>

          <v-col cols="3" class="pa-1">
            <v-btn block size="x-large" color="grey-darken-2" @click="clear"
              >C</v-btn
            >
          </v-col>
          <v-col cols="9" class="pa-1">
            <v-btn
              block
              size="x-large"
              color="orange-darken-2"
              @click="calculate"
              >=</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      current: "",
      previous: null,
      operator: null,
      operatorClicked: false,
    };
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyboard);
  },
  // This cleans up if the component is destroyed (Good Software Quality!)
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyboard);
  },
  methods: {
    isOperator(val) {
      return ["+", "-", "*", "/"].includes(val);
    },
    handleKeyboard(e) {
      // Numbers 0-9
      if (e.key >= "0" && e.key <= "9") this.append(e.key);

      // Operators
      if (e.key === "+") this.setOperator("+");
      if (e.key === "-") this.setOperator("-");
      if (e.key === "*") this.setOperator("*");
      if (e.key === "/") this.setOperator("/");

      // Special Keys
      if (e.key === "Enter" || e.key === "=") {
        e.preventDefault(); // Stop page from scrolling/refreshing
        this.calculate();
      }
      if (e.key === "Escape" || e.key === "c" || e.key === "C") {
        this.clear();
      }
      if (e.key === "Backspace") {
        this.current = this.current.slice(0, -1);
      }
    },
    append(num) {
      if (this.operatorClicked) {
        this.current = "";
        this.operatorClicked = false;
      }
      if (num === "." && this.current.includes(".")) return;
      this.current = `${this.current}${num}`;
    },

    setOperator(op) {
      if (this.current === "") return;
      this.operator = op;
      this.previous = this.current;
      this.operatorClicked = true;
    },

    clear() {
      this.current = "";
      this.previous = null;
      this.operator = null;
      this.operatorClicked = false;
    },

    calculate() {
      const a = parseFloat(this.previous);
      const b = parseFloat(this.current);
      if (isNaN(a) || isNaN(b)) return;

      let res;
      switch (this.operator) {
        case "+":
          res = a + b;
          break;
        case "-":
          res = a - b;
          break;
        case "*":
          res = a * b;
          break;
        case "/":
          res = b === 0 ? "Error" : a / b;
          break;
        default:
          return;
      }
      this.current = res.toString();
      this.operator = null;
      this.previous = null;
    },
  },
};
</script>
