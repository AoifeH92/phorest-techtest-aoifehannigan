import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | search-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<SearchForm />`);

    assert.dom('[data-test-email]').exists();
    assert.dom('[data-test-phone]').exists();
    assert.dom('[data-test-search]').exists();
    assert.dom('[data-test-form-empty]').doesNotExist();
  });

  test('it submits an email correctly', async function(assert) {
    const expectedEmail = 'test@phorest.com';
    this.queryClients = {
      perform: (email, phone) => {
        assert.equal(email, expectedEmail);
        assert.equal(phone, '');
      }
    }
    await render(hbs`<SearchForm @queryClients={{this.queryClients}}/>`);

    await fillIn('[data-test-email]', expectedEmail);

    await click('[data-test-search]');
  });

  test('it submits an phone correctly', async function(assert) {
    const expectedPhone = '123456';
    this.queryClients = {
      perform: (email, phone) => {
        assert.equal(email, '');
        assert.equal(phone, expectedPhone);
      }
    }
    await render(hbs`<SearchForm @queryClients={{this.queryClients}}/>`);

    await fillIn('[data-test-phone]', expectedPhone);

    await click('[data-test-search]');
  });

  test('it displays an error if no phone or email passed', async function(assert) {
    await render(hbs`<SearchForm/>`);

    await click('[data-test-search]');

    assert.dom('[data-test-form-empty]').exists();
  })
});
