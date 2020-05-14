<template>
<div>
  <vs-row vs-w="12"  vs-type="flex" vs-justify="flex-start">
    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-xs="6" vs-lg="6">
      <vs-button @click="toggleSidebar" icon="view_headline"></vs-button>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-xs="6" vs-lg="6">
    </vs-col>
  </vs-row>

  <vs-row vs-type="flex" vs-justify="center" vs-align="center">
    <vs-col vs-w="11">
  <vs-card>
    <div slot="header">
      <h2>
        Lorem ipsum dolor sit amet
      </h2>
    </div>
    consectetur adipiscing elit. Quisque nec nisl aliquet,
    condimentum enim non, hendrerit magna. Nunc sed congue dolor,
    et auctor libero. Sed justo massa, pharetra ut feugiat id, ultrices eu lacus.
    Cras viverra cursus tortor, quis laoreet magna tempor vitae. Integer congue,
    enim quis posuere ultrices, felis odio feugiat nisl, id sagittis magna turpis et sapien.
    Integer tempor magna mauris, eu laoreet ex semper eget.
  </vs-card>

  <vs-card>
    <div slot="header">
      <h2>
        In bibendum vehicula cursus
      </h2>
    </div>
    Ut ultricies justo ac ex laoreet laoreet. Duis iaculis dui quis rhoncus aliquet.
    Sed convallis consectetur lacus, vel feugiat mauris volutpat sit amet.
    Aliquam orci lectus, lacinia ut tortor eget, dapibus blandit urna.
    Phasellus congue eros nec finibus congue. Fusce elementum sed lorem nec lacinia.
  </vs-card>

  <vs-card>
    <div slot="header">
      <h2>
        Etiam in mauris vitae turpis ullamcorper
      </h2>
    </div>
    suscipit ac quis urna. Cras tincidunt ultricies velit id accumsan.
    Maecenas consequat elit a massa egestas lacinia. Suspendisse sit
    amet pretium velit. Proin vel diam felis. Nunc tristique facilisis
    ligula, ut aliquet nisl bibendum a. Suspendisse sodales, nunc ac bibendum
    vulputate, est ante aliquet nisi, vel tristique purus lacus ut sapien.
    Maecenas mi eros, finibus id risus porta, lobortis ultrices lacus.
    Integer tempor magna mauris, eu laoreet ex semper eget.
  </vs-card>

  <vs-card>
    <div slot="header">
      <h2>
        Mauris at neque mi.
      </h2>
    </div>
    Donec mollis neque et lacus iaculis congue. Maecenas eleifend volutpat leo,
    nec bibendum ipsum convallis id. Curabitur tempor nec nunc et bibendum.
    Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut vel
    augue vel neque luctus ultricies.
  </vs-card>

  <vs-card>
    <div slot="header">
      <h2>
        Cras laoreet massa ut pharetra efficitur.
      </h2>
    </div>
    Sed porttitor tristique fringilla. Curabitur nec sem tortor. Etiam vel ultricies massa.
    Quisque mollis molestie ex. Nam vel lacus mauris. Nullam dapibus turpis hendrerit
    faucibus facilisis. Integer orci leo, rutrum eu velit quis, consequat accumsan neque.
  </vs-card>
    </vs-col>
  </vs-row>

</div>
</template>

<script>
import { TOGGLE_SIDEBAR } from '@/store/actions/UI';


export default {
  name: 'Task',
  methods:
    {
      toggleSidebar() {
        this.$store.dispatch(TOGGLE_SIDEBAR);
      },
    },
};
</script>

<style scoped>

</style>
