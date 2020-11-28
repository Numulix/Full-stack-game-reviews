<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" @keyup.enter="searchName"
               placeholder="Search by game name" v-model="title">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary"
                  type="button" @click="searchName">Search</button>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <h4>Game List</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(review, index) in reviews"
            :key="index"
            @click="setActiveReview(review, index)"
            >{{ review.name }}</li>
      </ul>
    </div>

    <div class="col-md-6">
     <div v-if="currentReview">
       <h4>{{ currentReview.name }}</h4>
       <div>
         <img :src="currentReview.image">
       </div>

       <div>
         <label><strong>Game release year:</strong></label> {{ currentReview.release_year }}
       </div>
       <div>
         <label><strong>Rating:</strong></label> {{ currentReview.rating }}
       </div>
       <div>
         <label><strong>Review:</strong></label> {{ currentReview.review }}
       </div>

       <a class="badge badge-warning"
          :href="'/review/' + currentReview.id">Edit</a>
     </div>

      <div v-else>
        <br />
        <p>Select a game to see its review</p>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewDataService from "@/services/ReviewDataService";

export default {
  name: "ReviewsList",
  data() {
    return {
      reviews: [],
      currentReview: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveReviews() {
      ReviewDataService.getAll()
        .then(res => {
          this.reviews = res.data;
          console.log(res.data);
        })
        .catch(e => {
          console.log(e.response.data);
        });
    },

    setActiveReview(review, index) {
      this.currentReview = review;
      this.currentIndex = index;
    },

    searchName() {
      ReviewDataService.findByName(this.title)
        .then(res => {
          this.reviews = res.data;
        })
        .catch(e => {
          console.log(e);
        })
    },

  },
  mounted() {
    this.retrieveReviews();
  }
}
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
  color: lightslategray;
}

.list-group-item:hover {
  background: teal;
}

img {
  max-width: 300px;
  height: auto;
}
</style>