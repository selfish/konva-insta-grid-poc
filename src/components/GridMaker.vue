<template>
    <div class="flex flex-col justify-between align-middle content-center">
        <h1>{{ msg }}</h1>
        <button v-on:click="generateGrid()">BOOM IT</button>
        <input type="file" id="input">
        <!--<canvas class="max-w-full" id="canvas"/>-->
        <v-stage ref="stage" :config="configKonva">
            <v-layer ref="img-layer">
                <v-image :config="configImg"></v-image>
            </v-layer>
        </v-stage>
    </div>
</template>

<script>
  //import FileUpload from "./FileUpload";
  import Konva from "konva";
  import Grider from "../services/grider";

  const INITIAL_SIZE_FACTOR = .6;
  const STROKE_COLOR = '#0edde2';
  const LINE_BASE = Object.freeze({
    dash: [10, 10],
    points: [],
    stroke: STROKE_COLOR,
    strokeScaleEnabled: false
  });

  export default {
    name: 'GridMaker',
    //components: { FileUpload },
    props: {
      msg: String,
    },
    data() {
      return {
        userImage: new Image(100, 100),
        transformer: null,
      }
    },
    computed: {
      imgWidth() {
        return this.userImage ? this.userImage.width : 100;
      },
      imgHeight() {
        return this.userImage ? this.userImage.height : 100;
      },
      configKonva() {
        return {
          width: this.imgWidth,
          height: this.imgHeight
        }
      },
      configImg() {
        return {
          x: 20,
          y: 20,
          image: this.userImage,
          width: this.imgWidth,
          height: this.imgHeight,
        }
      },
      stage() {
        return this.$refs.stage.getStage();
      },
    },
    mounted() {
      this.startListening();
      this.grid = new Grider();
    },
    methods: {
      mkGrid() {
        const stage = this.stage;
        const layer = new Konva.Layer();
        const group = new Konva.Group({ draggable: true });

        const smallerDimension = INITIAL_SIZE_FACTOR * Math.min(this.imgWidth / this.grid.cols, this.imgHeight / this.grid.rows);

        const pWidth = smallerDimension * this.grid.cols;
        const pHeight = smallerDimension * this.grid.rows;

        const overspace = new Konva.Rect({ width: pWidth, height: pHeight, });
        overspace.on('mouseenter', () => (stage.container().style.cursor = 'pointer'));
        overspace.on('mouseleave', () => (stage.container().style.cursor = 'default'));
        group.add(overspace);

        // Horizontal Lines:
        for (let row = 1; row < this.grid.rows; row++) {
          const points = [
            0,
            smallerDimension * row,
            pWidth,
            smallerDimension * row,
          ];

          const lineCfg = Object.assign({}, LINE_BASE, { points });
          group.add(new Konva.Line(lineCfg))
        }

        // Vertical Lines:
        for (let col = 1; col < this.grid.cols; col++) {
          const points = [
            smallerDimension * col,
            0,
            smallerDimension * col,
            pHeight
          ];

          const lineCfg = Object.assign({}, LINE_BASE, { points });
          group.add(new Konva.Line(lineCfg))
        }

        this.transformer = new Konva.Transformer({
          ref: 'trans',
          node: group,
          rotateEnabled: false,
          //borderEnabled: false,
          enabledAnchors: ['top-left', 'bottom-right']
        });

        stage.add(layer);
        layer.add(group);
        layer.add(this.transformer);
        layer.draw();
      },
      startListening() {
        document.getElementById('input').onchange = this.inputChange;
      },
      inputChange(event) {
        const img = new Image();
        img.onload = () => {
          this.userImage = img;
          this.mkGrid();
        };
        img.onerror = this.failed;
        const file = event.target.files[0];
        img.src = URL.createObjectURL(file);
      },
      failed() {
        alert("The provided file couldn't be loaded as an Image media");
      },
      generateGrid() {
        const tr = this.transformer;
        const trX = tr.x();
        const trY = tr.y();
        const width = tr.width / this.grid.cols;
        const height = tr.height / this.grid.rows;

        const blocks = [];

        for (let col = 0; col < this.grid.cols; col++) {
          for (let row = 0; row < this.grid.rows; row++) {
            const x = trX + (width * col);
            const y = trY + (height * row);

            const cfg = { x, y, width, height };
            console.log("EXPORT:", JSON.stringify(cfg))
            const block = this.stage.toDataURL(cfg);
            blocks.push(block);
          }
        }

        console.log('blocks');

        // blocks.forEach(() => {
        //   //window.open(block);
        //   // const img = document.createElement("img");
        //   // img.src = block;
        //   // const src = document.getElementById("header");
        //   // src.appendChild(img);
        // });
      }
    },
  }
</script>

<style scoped lang="scss">
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
</style>
