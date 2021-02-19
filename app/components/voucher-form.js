import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class VoucherFormComponent extends Component {
  @tracked voucherValue = 0;
  @tracked selectedClient = this.args.clients[0];
  

  get allowCreate() {
    return this.voucherValue > 0 && 
      this.selectedClient && 
      !this.args.createVoucher.isRunning;
  }

  @action
  createVoucher() {
    this.args.createVoucher.perform(this.selectedClient, this.voucherValue);
  }
}
