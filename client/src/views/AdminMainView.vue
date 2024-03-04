<template>
  <HeaderAdmin />
  <div class="container float-left">
    <SideBarAdmin />
  </div>
  <router-view :key="$route.fullPath"/>
  <Footer />

</template>

<script>
import HeaderAdmin from '../layouts/HeaderAdminComponent.vue';
import SideBarAdmin from '../layouts/SideBarAdminComponent.vue';
import Footer from '../layouts/FooterComponent.vue';

export default {
  components: {
    HeaderAdmin,
    SideBarAdmin,
    Footer
  }
}

</script>
