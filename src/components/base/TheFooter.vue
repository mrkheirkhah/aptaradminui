<template>
  <CFooter :fixed="false">
    <div>
      <span class="ml-1"> aptar {{ new Date().getFullYear() }} &copy;</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1">Powered by CoreUI</span>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>
