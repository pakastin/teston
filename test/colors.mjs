import { red, green, grey, RED, GREEN, GREY, RESET } from '../src/colors.mjs';

export default (t) => {
  t('Green color', (t) => {
    t.plan(1);
    t.equal(green('green'), GREEN + 'green' + RESET, 'works');
  });
  t('Red color', (t) => {
    t.plan(1);
    t.equal(red('red'), RED + 'red' + RESET, 'works');
  });
  t('Grey color', (t) => {
    t.plan(1);
    t.equal(grey('grey'), GREY + 'grey' + RESET, 'works');
  });
};
