<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <router-link to="/" class="navbar-brand">Game Reviews</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/reviews" class="nav-link">All Reviews</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Write a Review</router-link>
        </li>
      </div>
    </nav>
</template>

<script>
export default {
    
}
</script>