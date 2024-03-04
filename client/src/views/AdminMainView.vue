<template>
  <HeaderAdmin />
  
  <div class="container-fluid">
    <div class="row my-3">
      <div class="col-2">
        <SideBarAdmin />
      </div>
      <div class="col-10">
        <router-view :key="$route.fullPath" class="float-left"/>
      </div>
    </div>
  </div>
  
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
