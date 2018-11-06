import { red, green, grey, RED, GREEN, GREY, RESET } from '../src/colors.mjs';

export default (t) => {
  t('Print green color', (t) => {
    t.plan(1);
    t.equal(green('green'), GREEN + 'green' + RESET, 'Is green');
  });
  t('Print red color', (t) => {
    t.plan(1);
    t.equal(red('red'), RED + 'red' + RESET, 'Is red');
  });
  t('Print grey color', (t) => {
    t.plan(1);
    t.equal(grey('grey'), GREY + 'grey' + RESET, 'Is grey');
  });
};
