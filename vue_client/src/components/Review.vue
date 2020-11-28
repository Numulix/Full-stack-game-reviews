<template>
  <div v-if="currentReview" class="edit-form">
    <h4>Review:</h4>
    <div>
      <img v-if="$v.currentReview.image.isImageURL && $v.currentReview.image.required" :src="currentReview.image" alt="game image">
      <img v-else src="https://blog.logicalincrements.com/wp-content/uploads/2017/03/pc-master-race.jpg" alt="pc master race">
    </div>
    <form>
      <div class="form-group">
        <label for="name">Game name:</label>
        <input class="form-control" id="name"
               v-model="currentReview.name" required
               type="text"
        >
        <span v-if="!$v.currentReview.name.required" class="text-danger">Name is required</span>
      </div>

      <div class="form-group">
        <label for="release_year">Game release year:</label>
        <input class="form-control" id="release_year"
               v-model="currentReview.release_year" required
               type="number"
        >
        <span v-if="!$v.currentReview.release_year.required" class="text-danger">Cannot be empty</span>
        <span v-if="!$v.currentReview.release_year.between" class="text-danger">Must be between 1950-2020</span>
      </div>

      <div class="form-group">
        <label for="image">Game image URL:</label>
        <input type="url" class="form-control"
               required id="image" v-model="currentReview.image"
        >
        <span class="text-danger" v-if="!$v.currentReview.image.required">Image cannot be empty</span>
        <span class="text-danger" v-if="!$v.currentReview.image.isImageURL">Invalid URL</span>
      </div>

      <div class="form-group">
        <label for="rating">Rating:</label>
        <input class="form-control" id="rating"
               required v-model="currentReview.rating"
               type="number" step="0.1"
        >
        <span class="text-danger" v-if="!$v.currentReview.rating.required">Include your game rating</span>
        <span class="text-danger" v-if="!$v.currentReview.rating.between">Must be between 1 and 10</span>
        <span class="text-danger" v-if="!$v.currentReview.rating.isValidRating">Must contain only one decimal place</span>
      </div>

      <div class="form-group">
        <label for="review">Review:</label>
        <textarea id="review" class="form-control"
                  v-model="currentReview.review" rows="5"
        ></textarea>
        <span class="text-danger" v-if="!$v.currentReview.review.maxLength">Must be less than 512 characters long</span>
      </div>
    </form>

    <button type="submit" class="badge badge-success" @click="updateReview">Update</button>
    <button class="badge badge-danger mr-2" @click="deleteReview">Delete</button>
  </div>

  <div v-else id="message">
    {{ this.message }}
  </div>
</template>

<script>
import ReviewDataService from "@/services/ReviewDataService";
import { required, between, maxLength } from 'vuelidate/lib/validators';

export default {
  name: "Review",
  data() {
    return {
      currentReview: null,
      message: ''
    };
  },
  methods: {
    getReview(id) {
      ReviewDataService.get(id)
        .then(res => {
          this.currentReview = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateReview() {
      ReviewDataService.update(this.currentReview.id, JSON.stringify({
        name: this.currentReview.name,
        release_year: this.currentReview.release_year,
        image: this.currentReview.image,
        rating: this.currentReview.rating,
        review: this.currentReview.review
      }))
        .then( () => {
          this.message = 'Review updated successfully';
          this.currentReview = null;
        })
        .catch(e => {
          console.log(e.response);
        });
    },

    deleteReview() {
      ReviewDataService.delete(this.currentReview.id)
        .then( () => {
          this.$router.push({ name: "reviews" });
        })
        .catch(e => {
          console.log(e);
        })
    }
  },
  validations: {
    currentReview: {
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
  },
  mounted() {
    this.message = '';
    this.getReview(this.$route.params.id);
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 400px;
  margin: auto;
  color: white;
}

img {
  width: 300px;
  height: auto;
  margin-bottom: 10px;
}

#message {
  color: white;
}
</style>