<template>
  <div class="submit-form">
    <div v-if="!submitted">

      <div>
        <img v-if="$v.gameReview.image.isImageURL && $v.gameReview.image.required" :src="gameReview.image" alt="game image">
        <img v-else src="https://blog.logicalincrements.com/wp-content/uploads/2017/03/pc-master-race.jpg" alt="pc master race">
      </div>

      <div class="form-group">
        <label for="name">Game Name:</label>
        <input type="text"
               class="form-control"
               id="name"
               required
               v-model="gameReview.name"
               name="name"
               placeholder="Enter game name"
        >
        <span v-if="!$v.gameReview.name.required" class="text-danger">Name is required</span>
      </div>

      <div class="form-group">
        <label for="release_year">Game release year:</label>
        <input type="number"
               id="release_year"
               required
               v-model="gameReview.release_year"
               class="form-control"
               name="release_year"
               placeholder="1950-2020"
        >
        <span v-if="!$v.gameReview.release_year.required" class="text-danger">Cannot be empty</span>
        <span v-if="!$v.gameReview.release_year.between" class="text-danger">Must be between 1950-2020</span>
      </div>

      <div class="form-group">
        <label for="image">Image URL for the game:</label>
        <input class="form-control"
               type="url"
               id="image"
               required
               v-model="gameReview.image"
               name="image"
        >
        <span class="text-danger" v-if="!$v.gameReview.image.required">Image cannot be empty</span>
        <span class="text-danger" v-if="!$v.gameReview.image.isImageURL">Invalid URL</span>
      </div>

      <div class="form-group">
        <label for="rating">Rating:</label>
        <input class="form-control"
               type="number"
               step="0.1"
               id="rating"
               required
               v-model="gameReview.rating"
               name="rating"
        >
        <span class="text-danger" v-if="!$v.gameReview.rating.required">Include your game rating</span>
        <span class="text-danger" v-if="!$v.gameReview.rating.between">Must be between 1 and 10</span>
        <span class="text-danger" v-if="!$v.gameReview.rating.isValidRating">Must contain only one decimal place</span>
      </div>

      <div class="=form-group">
        <label for="review">Review (Optional):</label>
        <textarea class="form-control"
                  id="review"
                  v-model="gameReview.review"
                  name="review"
                  rows="5"
        />
        <span class="text-danger" v-if="!$v.gameReview.review.maxLength">Must be less than 512 characters long</span>
      </div>

      <button @click="saveReview" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>Reviews submitted successfully</h4>
      <button class="btn btn-success" @click="newReview">Add</button>
    </div>
  </div>
</template>

<script>
import ReviewDataService from "@/services/ReviewDataService";
import { required, between, maxLength } from 'vuelidate/lib/validators';

export default {
  name: "AddReview",
  data() {
    return {
      gameReview: {
        id: null,
        name: '',
        release_year: '',
        image: '',
        rating: 0,
        review: ''
      },
      submitted: false
    };
  },
  methods: {
    saveReview() {
      let data = {
        name: this.gameReview.name,
        release_year: this.gameReview.release_year,
        image: this.gameReview.image,
        rating: this.gameReview.rating,
        review: this.gameReview.review
      };

      ReviewDataService.create(data)
        .then(res => {
          this.gameReview.id = res.data.id;
          console.log(res.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e.response.data);
        })
    },

    newReview() {
      this.submitted = false;
      this.gameReview = {};
    }
  },
  validations: {
    gameReview: {
      name: {
        required
      },
      release_year: {
        required,
        between: between(1950, 2020)
      },
      image: {
        isImageURL(image) {
          const regex = /(https?:\/\/.*\.(?:png|jpg))/;
          return regex.test(image);
        },
        required
      },
      rating: {
        required,
        between: between(1, 10),
        isValidRating(rating) {
          const regex = /^\d{0,2}(?:\.\d)?$/;
          return regex.test(rating);
        }
      },
      review: {
        maxLength: maxLength(512)
      }
    }
  }
};
</script>

<style scoped>
.submit-form {
  max-width: 400px;
  margin: auto;
}

label {
  color: lightgray;
}

button {
  margin-top: 20px;
}

img {
  width: 400px;
  height: auto;
  margin-bottom: 10px;
}
</style>