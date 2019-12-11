<template>
    <div id="header">{{ msg }}</div>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      msg: String
    },
    mounted() {
      this.startListening()
    },
    methods: {
      startListening() {
        document.getElementById('input').onchange = this.inputChange;
      },
      inputChange(event) {
        const img = new Image();
        img.onload = () => {
          this.draw(img)
        };
        img.onerror = this.failed;
        const file = event.target.files[0];
        img.src = URL.createObjectURL(file);
      },
      draw(img) {
        const canvas = document.getElementById('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
      },
      failed() {
        alert("The provided file couldn't be loaded as an Image media");
      }
    },
  }
</script>


<style scoped lang="scss">

</style>
