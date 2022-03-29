import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';
import MainPage from '@/components/pages/MainPage.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();

const factory = (vuetify) => mount(MainPage, {
  localVue,
  vuetify,
});

describe('Form valdiations', () => {

  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('should have an error message if project name is empty', async () => {
    const wrapper = factory(vuetify);
    const form = wrapper.vm.$root.$refs.MainPage.$refs.form;

    form.validate();
    await Vue.nextTick();

    expect(form.inputs[0].errorBucket[0]).toBe('Project name is required');
  });

  it('should have an error message if any user was selected', async () => {
    const wrapper = factory(vuetify);
    const form = wrapper.vm.$root.$refs.MainPage.$refs.form;

    form.validate();
    await Vue.nextTick();

    expect(form.inputs[4].errorBucket[0]).toBe('At least one user is required');
  });
})
