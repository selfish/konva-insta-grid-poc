<template>
    <div id="app" class="flex flex-col">
        <Header class="h-24" msg="HEADER"/>
        <div class="flex flex-row flex-1">
            <GridMenu class="flex w-1/3" msg="GRID-MENU"/>
            <GridMaker class="flex flex-1" msg="GRID-MAIN"/>
        </div>
    </div>
</template>

<script>
  import Header from './components/Header.vue'
  import GridMenu from './components/GridMenu.vue'
  import GridMaker from './components/GridMaker.vue'

  export default {
    name: 'app',
    components: {
      Header,
      GridMenu,
      GridMaker,
    }
  }
</script>

<style lang="scss">

    div {
        border: 1px dashed lightcoral;
    }

    body {
        margin: 0;
        padding: 0;
    }

    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        width: 100vw;
        height: 100vh;
    }
</style>
