import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | voucher', function(hooks) {
  setupApplicationTest(hooks);
  

  test('visiting /', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');

    assert.dom('[data-test-email]').exists();
    assert.dom('[data-test-phone]').exists();
    assert.dom('[data-test-search]').exists();
  });
});
