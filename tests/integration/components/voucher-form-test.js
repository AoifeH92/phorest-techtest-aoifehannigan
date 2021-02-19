import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, fillIn, pauseTest, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | voucher-form', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(() => {
    this.clients = [
      { id: 1, firstName: 'Aoife', lastName: 'Hannigan', email:'aoife.hannigan@test.com', phone: '213455'},
      { id: 2, firstName: 'Aoife', lastName: 'Hannigan', email:'aoife.hannigan@test.com', phone: '897897'}
    ];
  });

  test('it renders', async function(assert) {
 
    await render(hbs`<VoucherForm />`);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('it displays a list of clients if present', async function(assert) {
    await render(hbs`<VoucherForm @clients={{this.clients}} @isLoading={{false}}/>`);

    assert.dom('[data-test-result]').exists({count: 2});
    assert.dom('[data-test-clients-loading]').doesNotExist();
  });

  test('it displays 1 selected client', async function(assert) {
    await render(hbs`<VoucherForm @clients={{this.clients}} @isLoading={{false}}/>`);

    assert.dom('[data-test-result].selected').exists({count: 1});
  });

  test('it displays a select button', async function(assert) {
    await render(hbs`<VoucherForm @clients={{this.clients}} @isLoading={{false}}/>`);

    assert.dom('[data-test-select-client]').exists({count: 1});
  });

  test('it updates the selected client on click', async function(assert) {
    await render(hbs`<VoucherForm @clients={{this.clients}} @isLoading={{false}}/>`);

    assert.dom('[data-test-result="1"]').hasClass('selected');
    assert.dom('[data-test-result="2"]').doesNotHaveClass('selected');

    await click('[data-test-select-client]');

    assert.dom('[data-test-result="1"]').doesNotHaveClass('selected');
    assert.dom('[data-test-result="2"]').hasClass('selected');
  });

  test('it displays a loading message', async function(assert) {
    await render(hbs`<VoucherForm @clients={{this.clients}} @isLoading={{true}}/>`);

    assert.dom('[data-test-result]').doesNotExist()
    assert.dom('[data-test-clients-loading]').exists();
  });

  test('it displays a loading message 2', async function(assert) {
    this.createVoucher = {
      perform: (client, value) => {
        assert.equal(client, this.clients[0]);
        assert.equal(value, 20);
      }
    }

    await render(hbs`<VoucherForm @clients={{this.clients}} @isLoading={{false}} @createVoucher={{this.createVoucher}}/>`);

    await settled();
    await fillIn('[data-test-voucher-value]', 20);

    await click('[data-test-create-voucher]');
  });

  test('it disables the create voucher button if no voucher value inputted', async function(assert) {
    await render(hbs`<VoucherForm @clients={{this.clients}} @isLoading={{false}}/>`);

    assert.dom('[data-test-create-voucher]').hasAttribute('disabled');
  });

  test('it disables the create voucher button when the create task is in progress', async function(assert) {
    this.createVoucher = {
      isRunning: true
    }

    await render(hbs`<VoucherForm @clients={{this.clients}} @isLoading={{false}} @createVoucher={{this.createVoucher}}/>`);

    assert.dom('[data-test-create-voucher]').hasAttribute('disabled');
    assert.dom('[data-test-create-voucher]').hasText('Creating...');
  });

  test('it displays the created voucher', async function(assert) {
    this.voucher = {
      clientId: 1,
      serialNumber: 123,
      originalBalance: 20
    }

    await render(hbs`<VoucherForm @clients={{this.clients}} @isLoading={{false}} @voucher={{this.voucher}}/>`);

    assert.dom('[data-test-voucher]').hasText('€20 Voucher created for Client 1 with serial number 123');
  });

});
