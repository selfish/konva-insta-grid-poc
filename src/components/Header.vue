<template>
    <div id="header" style="height: 400px; width: 330px;" class="flex flex-col flex-wrap"></div>
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


<style lang="scss">
    .grider {
        margin: 5px;
        height: 100px;
        width: 100px;
    }
</style>
